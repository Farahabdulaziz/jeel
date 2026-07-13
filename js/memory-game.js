/* ---------- لعبة الذاكرة: بطاقات مقلوبة/تذكّر الأزواج ---------- */
const MEMORY_SYMBOLS = ['🐰', '🪐', '☁️', '🌸', '⭐', '🕌'];
const MEMORY_SYMBOL_NAMES = {
  '🐰': 'أرنب', '🪐': 'كوكب', '☁️': 'غيمة', '🌸': 'وردة', '⭐': 'نجمة', '🕌': 'مسجد'
};
// 4 ألوان ثابتة تدور عليها اللعبة بالتناوب بعد كل جولة (مو عشوائي)
const CARD_BACK_PALETTES = [
  { bg: '#1F6F4A', fg: '#BFE8C9' }, // أخضر غامق / أخضر فاتح
  { bg: '#1F4E8C', fg: '#BFD9F5' }, // أزرق غامق / أزرق فاتح
  { bg: '#5B3A8E', fg: '#D9C8F0' }, // بنفسجي غامق / بنفسجي فاتح
  { bg: '#B85C1F', fg: '#F5D2AE' }  // برتقالي غامق / برتقالي فاتح
];
let memoryPaletteIndex = 0;
let currentCardPalette = CARD_BACK_PALETTES[0];
let memoryState = { deck: [], flipped: [], matched: [], lock: false };

function initMemoryGame() {
  currentCardPalette = CARD_BACK_PALETTES[memoryPaletteIndex % CARD_BACK_PALETTES.length];
  memoryPaletteIndex++;
  memoryState = {
    deck: shuffle([...MEMORY_SYMBOLS, ...MEMORY_SYMBOLS]),
    flipped: [],
    matched: [],
    lock: false
  };
}

function renderMemoryGamePage(game) {
  initMemoryGame();

  app.innerHTML = `
    <div class="top-bar">
      <h1>${game.title}</h1>
      <a class="back-button" href="#/">&#8594; الرئيسية</a>
    </div>
    <div class="memory-name-banner" id="memoryNameToast"></div>
    <div class="memory-board" id="memoryBoard"></div>
    <div id="memoryWinSlot"></div>
  `;
  renderMemoryBoard();
}

function renderMemoryBoard() {
  const board = document.getElementById('memoryBoard');
  if (!board) return;
  board.innerHTML = memoryState.deck.map((sym, idx) => {
    const isMatched = memoryState.matched.includes(idx);
    const isFlipped = isMatched || memoryState.flipped.includes(idx);
    const backStyle = isFlipped ? '' : `style="background:${currentCardPalette.bg};color:${currentCardPalette.fg}"`;
    return `
      <button class="memory-card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}"
              data-idx="${idx}" ${isMatched ? 'disabled' : ''} ${backStyle} aria-label="بطاقة">
        ${isFlipped ? sym : '؟'}
      </button>
    `;
  }).join('');

  board.querySelectorAll('.memory-card').forEach(btn => {
    btn.addEventListener('click', () => onMemoryCardClick(parseInt(btn.dataset.idx, 10)));
  });

  if (memoryState.matched.length === memoryState.deck.length) {
    showMemoryWin();
  }
}

function showMatchName(sym) {
  const toast = document.getElementById('memoryNameToast');
  if (!toast) return;
  const name = MEMORY_SYMBOL_NAMES[sym] || '';
  toast.textContent = `${sym} ${name}`;
  toast.classList.add('show');
  clearTimeout(window._nameToastTimer);
  window._nameToastTimer = setTimeout(() => toast.classList.remove('show'), 1400);
}

function onMemoryCardClick(idx) {
  if (memoryState.lock) return;
  if (memoryState.flipped.includes(idx) || memoryState.matched.includes(idx)) return;

  memoryState.flipped.push(idx);
  renderMemoryBoard();

  if (memoryState.flipped.length === 2) {
    memoryState.lock = true;
    const [a, b] = memoryState.flipped;
    if (memoryState.deck[a] === memoryState.deck[b]) {
      memoryState.matched.push(a, b);
      memoryState.flipped = [];
      memoryState.lock = false;
      showMatchName(memoryState.deck[a]);
      renderMemoryBoard();
    } else {
      setTimeout(() => {
        memoryState.flipped = [];
        memoryState.lock = false;
        renderMemoryBoard();
      }, 800);
    }
  }
}

function showMemoryWin() {
  const slot = document.getElementById('memoryWinSlot');
  if (!slot) return;
  slot.innerHTML = `
    <div class="memory-win">
      <span class="emoji">🎉</span>
      <p>أحسنت!</p>
      <div class="end-actions">
        <button class="big-button" id="memoryReplayBtn">العب مرة ثانية</button>
        <a class="big-button secondary" href="#/">الرئيسية</a>
      </div>
    </div>
  `;
  document.getElementById('memoryReplayBtn').addEventListener('click', () => {
    slot.innerHTML = '';
    initMemoryGame();
    renderMemoryBoard();
  });
}
