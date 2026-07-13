/* ---------- لعبة التركيبة (بازل): معالم إسلامية وعالمية حقيقية ---------- */
const PUZZLE_ITEMS = [
  {
    name: 'الكعبة المشرفة',
    img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kaaba,_Makkah6.jpg?width=700',
    creditText: 'الصورة: Moataz Egbaria — ويكيميديا كومنز (CC BY-SA 3.0)',
    creditUrl: 'https://commons.wikimedia.org/wiki/File:Kaaba,_Makkah6.jpg'
  },
  {
    name: 'المسجد الأقصى',
    img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Al-Aqsa_mosque_%288682155875%29.jpg?width=700',
    creditText: 'الصورة: Paul Arps — ويكيميديا كومنز (CC BY 2.0)',
    creditUrl: 'https://commons.wikimedia.org/wiki/File:Al-Aqsa_mosque_(8682155875).jpg'
  },
  {
    name: 'أهرامات الجيزة',
    img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Pyramids_of_the_Giza_Necropolis.jpg?width=700',
    creditText: 'الصورة: KennyOMG — ويكيميديا كومنز (CC BY-SA 4.0)',
    creditUrl: 'https://commons.wikimedia.org/wiki/File:Pyramids_of_the_Giza_Necropolis.jpg'
  },
  {
    name: 'جبل إفرست',
    img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mount_Everest_as_seen_from_Drukair2_PLW_edit_Cropped.jpg?width=700',
    creditText: 'الصورة: shrimpo1967 / Papa Lima Whiskey 2 — ويكيميديا كومنز (CC BY-SA 2.0)',
    creditUrl: 'https://commons.wikimedia.org/wiki/File:Mount_Everest_as_seen_from_Drukair2_PLW_edit_Cropped.jpg'
  }
];
let puzzleItemIndex = 0;
let puzzleState = { order: [], selected: null, currentItem: null };

function initPuzzleGame() {
  puzzleState.currentItem = PUZZLE_ITEMS[puzzleItemIndex % PUZZLE_ITEMS.length];
  puzzleItemIndex++;
  let order = shuffle([0, 1, 2, 3, 4, 5]);
  while (order.every((v, i) => v === i)) order = shuffle(order); // تأكيد إنها مو محلولة بالصدفة
  puzzleState.order = order;
  puzzleState.selected = null;
}

function renderPuzzleGamePage(game) {
  initPuzzleGame();

  app.innerHTML = `
    <div class="top-bar">
      <h1>${game.title}</h1>
      <a class="back-button" href="#/">&#8594; الرئيسية</a>
    </div>
    <p class="puzzle-hint">اضغطي على قطعتين عشان تبدّلين مكانهم</p>
    <div class="puzzle-board" id="puzzleBoard"></div>
    <p class="puzzle-credit" id="puzzleCredit"></p>
    <div id="puzzleWinSlot"></div>
  `;
  renderPuzzleBoard();
  renderPuzzleCredit();
}

function renderPuzzleCredit() {
  const el = document.getElementById('puzzleCredit');
  if (!el) return;
  el.innerHTML = `📷 <a href="${puzzleState.currentItem.creditUrl}" target="_blank" rel="noopener noreferrer">${puzzleState.currentItem.creditText}</a>`;
}

function renderPuzzleBoard() {
  const board = document.getElementById('puzzleBoard');
  if (!board) return;
  board.innerHTML = puzzleState.order.map((pieceId, cellIdx) => {
    const row = Math.floor(pieceId / 3);
    const col = pieceId % 3;
    const isSelected = puzzleState.selected === cellIdx;
    return `
      <button class="puzzle-piece ${isSelected ? 'selected' : ''}" data-cell="${cellIdx}"
              style="background-image:url('${puzzleState.currentItem.img}'); background-position:${col * 50}% ${row * 100}%;"
              aria-label="قطعة بازل"></button>
    `;
  }).join('');

  board.querySelectorAll('.puzzle-piece').forEach(btn => {
    btn.addEventListener('click', () => onPuzzlePieceClick(parseInt(btn.dataset.cell, 10)));
  });

  if (puzzleState.order.every((v, i) => v === i)) {
    showPuzzleWin();
  }
}

function onPuzzlePieceClick(cellIdx) {
  if (puzzleState.order.every((v, i) => v === i)) return;

  if (puzzleState.selected === null) {
    puzzleState.selected = cellIdx;
    renderPuzzleBoard();
    return;
  }
  if (puzzleState.selected === cellIdx) {
    puzzleState.selected = null;
    renderPuzzleBoard();
    return;
  }
  const a = puzzleState.selected, b = cellIdx;
  [puzzleState.order[a], puzzleState.order[b]] = [puzzleState.order[b], puzzleState.order[a]];
  puzzleState.selected = null;
  renderPuzzleBoard();
}

function showPuzzleWin() {
  const slot = document.getElementById('puzzleWinSlot');
  if (!slot) return;
  slot.innerHTML = `
    <div class="memory-win">
      <span class="emoji">🎉</span>
      <p>أحسنت! ${puzzleState.currentItem.name}</p>
      <div class="end-actions">
        <button class="big-button" id="puzzleReplayBtn">لعبة ثانية</button>
        <a class="big-button secondary" href="#/">الرئيسية</a>
      </div>
    </div>
  `;
  document.getElementById('puzzleReplayBtn').addEventListener('click', () => {
    slot.innerHTML = '';
    initPuzzleGame();
    renderPuzzleBoard();
    renderPuzzleCredit();
  });
}
