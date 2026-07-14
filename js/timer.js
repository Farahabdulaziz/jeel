/* ---------- مؤقت وقت اللعب ---------- */
const TIMER_KEY = 'kidsAppTimerMinutes';
const COOLDOWN_SECONDS = 15 * 60; // مدة الراحة الإلزامية بعد انتهاء الوقت
let timerMinutes = parseInt(localStorage.getItem(TIMER_KEY) || '30', 10) || 30;
let timerRemaining = timerMinutes * 60; // بالثواني
let timerExpired = false;
let cooldownRemaining = 0;

function formatTime(totalSeconds) {
  const s = Math.max(0, totalSeconds);
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const sec = (s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}

function updateTimerBadge() {
  const badge = document.getElementById('timerBadge');
  if (!badge) return;
  badge.textContent = '⏰ ' + formatTime(timerRemaining);
  const hash = location.hash.replace(/^#\/?/, '');
  const isHome = hash.split('/').filter(Boolean).length === 0;
  badge.classList.toggle('pos-left', isHome);
}

function tickTimer() {
  if (!timerExpired) {
    timerRemaining--;
    if (timerRemaining <= 0) {
      timerRemaining = 0;
      timerExpired = true;
      cooldownRemaining = COOLDOWN_SECONDS;
      if (ytPlayer && ytPlayer.pauseVideo) {
        try { ytPlayer.pauseVideo(); } catch (e) {}
      }
      router();
    }
    updateTimerBadge();
    return;
  }

  // بعد انتهاء الوقت: عد تنازلي لمدة الراحة الإلزامية (١٥ دقيقة)
  if (cooldownRemaining > 0) {
    cooldownRemaining--;
    if (cooldownRemaining <= 0) {
      timerExpired = false;
      timerRemaining = timerMinutes * 60;
      updateTimerBadge();
      location.hash = '#/';
      router();
    } else {
      renderTimeUp(); // تحديث العد التنازلي المعروض كل ثانية
    }
  }
}
setInterval(tickTimer, 1000);

function renderTimeUp() {
  document.title = "خلص الوقت";
  app.innerHTML = `
    <div class="time-up-screen">
      <span class="emoji">⏰</span>
      <h1>خلص وقت اللعب!</h1>
      <p>حان وقت الاستراحة بعيدا عن الشاشة</p>
      <p class="cooldown-text">تقدرون ترجعون للموقع بعد: <strong>${formatTime(cooldownRemaining)}</strong></p>
      <a class="big-button" href="${SURVEY_URL}" target="_blank" rel="noopener noreferrer">شاركينا رأيكم بالموقع (استبيان)</a>
    </div>
  `;
}

/* ---------- بوابة الأهل: سؤال بسيط قبل تغيير المؤقت ---------- */
function openParentalGate() {
  const a = Math.floor(Math.random() * 20) + 15; // 15-34
  const b = Math.floor(Math.random() * 20) + 15; // 15-34
  const root = document.getElementById('modalRoot');
  root.innerHTML = `
    <div class="modal-backdrop" id="modalBackdrop">
      <div class="modal-box">
        <h2>لتغيير مدة استخدام الموقع</h2>
        <p class="modal-question">${a} + ${b} = ؟</p>
        <input type="number" id="gateAnswer" class="modal-input" inputmode="numeric">
        <p class="modal-error" id="gateError" style="display:none;">الإجابة غير صحيحة، جرب مرة ثانية</p>
        <div class="modal-actions">
          <button class="big-button" id="gateConfirm">تأكيد</button>
          <button class="big-button secondary" id="gateCancel">إلغاء</button>
        </div>
      </div>
    </div>
  `;
  document.getElementById('gateCancel').addEventListener('click', closeModal);
  document.getElementById('modalBackdrop').addEventListener('click', (e) => {
    if (e.target.id === 'modalBackdrop') closeModal();
  });
  document.getElementById('gateConfirm').addEventListener('click', () => {
    const val = parseInt(document.getElementById('gateAnswer').value, 10);
    if (val === a + b) {
      openTimerSettings();
    } else {
      document.getElementById('gateError').style.display = 'block';
    }
  });
}

function openTimerSettings() {
  const root = document.getElementById('modalRoot');
  root.innerHTML = `
    <div class="modal-backdrop" id="modalBackdrop">
      <div class="modal-box">
        <h2>مدة اللعب</h2>
        <div class="duration-options">
          <button class="duration-btn" data-min="15">15 دقيقة</button>
          <button class="duration-btn" data-min="30">30 دقيقة</button>
          <button class="duration-btn" data-min="45">45 دقيقة</button>
          <button class="duration-btn" data-min="60">60 دقيقة</button>
        </div>
        <div class="duration-custom">
          <input type="number" id="customMinutes" class="modal-input" min="1" max="180" placeholder="مدة مخصصة">
          <button class="big-button" id="customApply">تطبيق</button>
        </div>
        <button class="big-button secondary" id="gateCloseBtn">إغلاق</button>
      </div>
    </div>
  `;
  document.querySelectorAll('.duration-btn').forEach(btn => {
    btn.addEventListener('click', () => applyNewDuration(parseInt(btn.dataset.min, 10)));
  });
  document.getElementById('customApply').addEventListener('click', () => {
    const val = parseInt(document.getElementById('customMinutes').value, 10);
    if (val > 0) applyNewDuration(val);
  });
  document.getElementById('gateCloseBtn').addEventListener('click', closeModal);
  document.getElementById('modalBackdrop').addEventListener('click', (e) => {
    if (e.target.id === 'modalBackdrop') closeModal();
  });
}

function applyNewDuration(minutes) {
  timerMinutes = minutes;
  timerRemaining = minutes * 60;
  timerExpired = false;
  cooldownRemaining = 0;
  localStorage.setItem(TIMER_KEY, String(minutes));
  updateTimerBadge();
  closeModal();
  location.hash = '#/';
  router();
}

function closeModal() {
  const root = document.getElementById('modalRoot');
  if (root) root.innerHTML = '';
}

/* ---------- رسالة ترحيب للأهل (تظهر مرة وحدة فقط) + زر معلومات دائم ---------- */
const WELCOME_KEY = 'kidsAppWelcomeSeen';
const SURVEY_URL = 'https://forms.gle/xpSXk6ViWbsWdx6v8';

function welcomeIntroHTML() {
  return `
    <img class="site-logo-modal" src="assets/logo.png" alt="جيل">
    <p class="welcome-text">
      جيل موقع فيديوهات مختارة بعناية للأطفال (٣-٧ سنين) — محتوى عربي آمن يراعي القيم الإسلامية،
       ومزوّد بمؤقت استخدام تتحكم فيه.
    </p>
  `;
}

function openWelcomeModal() {
  const root = document.getElementById('modalRoot');
  root.innerHTML = `
    <div class="modal-backdrop" id="modalBackdrop">
      <div class="modal-box welcome-box">
        ${welcomeIntroHTML()}
        <p class="welcome-text">إختار مدة جلسة اللعب المناسبة لطفلك:</p>
        <div class="duration-options">
          <button class="duration-btn" data-min="15">15 دقيقة</button>
          <button class="duration-btn" data-min="30">30 دقيقة</button>
          <button class="duration-btn" data-min="45">45 دقيقة</button>
          <button class="duration-btn" data-min="60">60 دقيقة</button>
        </div>
        <button class="big-button secondary" id="welcomeSkip">تجاهل</button>
      </div>
    </div>
  `;
  document.querySelectorAll('.duration-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      localStorage.setItem(WELCOME_KEY, '1');
      applyNewDuration(parseInt(btn.dataset.min, 10));
    });
  });
  document.getElementById('welcomeSkip').addEventListener('click', () => {
    localStorage.setItem(WELCOME_KEY, '1');
    closeModal();
  });
}

function openInfoModal() {
  const root = document.getElementById('modalRoot');
  root.innerHTML = `
    <div class="modal-backdrop" id="modalBackdrop">
      <div class="modal-box welcome-box">
        ${welcomeIntroHTML()}
        <a class="big-button" href="${SURVEY_URL}" target="_blank" rel="noopener noreferrer">يسعدنا سماع ارائكم</a>
        <button class="big-button secondary" id="infoCloseBtn">إغلاق</button>
      </div>
    </div>
  `;
  document.getElementById('infoCloseBtn').addEventListener('click', closeModal);
  document.getElementById('modalBackdrop').addEventListener('click', (e) => {
    if (e.target.id === 'modalBackdrop') closeModal();
  });
}

if (!localStorage.getItem(WELCOME_KEY)) {
  openWelcomeModal();
}
