/* ---------- عنصر كرت فيديو واحد (يُستخدم بالرئيسية وبصفحة القناة) ---------- */
function videoCardHTML(channel, v) {
  const placeholder = isPlaceholderId(v.youtubeId);
  const thumb = placeholder
    ? `<div class="thumb-placeholder">🎬</div>`
    : `<img src="${thumbUrl(v.youtubeId)}" alt="" loading="lazy">`;
  const durationBadge = (v.duration && v.duration.trim())
    ? `<span class="duration-badge">${v.duration}</span>`
    : '';
  return `
    <div class="video-card">
      <a class="video-thumb-link" href="#/watch/${channel.id}/${v.id}">
        <div class="thumb-wrap">${thumb}${durationBadge}</div>
        <div class="video-title">${escapeHTML(v.title)}</div>
      </a>
      <a class="video-channel-link" href="#/channel/${channel.id}">
        ${avatarHTML(channel)}
        <span class="channel-name">${escapeHTML(channel.name)}</span>
      </a>
    </div>
  `;
}

/* ---------- عنصر كرت لعبة (دائرة زي شارات القنوات) ---------- */
function gameCardHTML(game) {
  const color = game.color || '#7C6FF0';
  return `
    <a class="game-card" href="#/game/${game.id}">
      <div class="game-circle" style="background:${color}">${game.emoji}</div>
      <div class="game-card-title">${game.title}</div>
    </a>
  `;
}

let currentFilter = 'الكل';

function getCategory(video) {
  return video.category || 'عام';
}
function getFlatVideos() {
  return CHANNELS.flatMap(ch => ch.videos.map(v => ({ channel: ch, video: v })));
}
function getAllCategories() {
  return Array.from(new Set(getFlatVideos().map(({ video }) => getCategory(video))));
}

/* ---------- الشاشة الرئيسية: قسم ألعاب + شريط تصفية فوق + فيد فيديوهات واحد ---------- */
function renderHome() {
  document.title = "جيل";
  if (!CHANNELS.length) {
    app.innerHTML = `
      <div class="top-bar"><h1><a href="#/about"><img class="site-logo" src="assets/logo.png" alt="جيل"></a></h1></div>
      <p class="empty-state">لا توجد قنوات بعد. أضيفي قناة من ملف data.js</p>`;
    return;
  }

  const gamesSection = (typeof GAMES !== 'undefined' && GAMES.length) ? `
    <section class="games-shelf">
      <h2>ألعاب</h2>
      <div class="games-row">${GAMES.map(gameCardHTML).join('')}</div>
    </section>
  ` : '';

  const categories = ['الكل', ...getAllCategories()];
  const chips = categories.map(cat => `
    <button class="chip ${cat === currentFilter ? 'active' : ''}" data-cat="${cat}">${cat}</button>
  `).join('');

  const items = getFlatVideos().filter(({ video }) =>
    currentFilter === 'الكل' || getCategory(video) === currentFilter
  );

  const grid = items.length
    ? items.map(({ channel, video }) => videoCardHTML(channel, video)).join('')
    : `<p class="empty-state">لا توجد فيديوهات في هذا التصنيف بعد.</p>`;

  app.innerHTML = `
    <div class="top-bar"><h1><a href="#/about" class="logo-link" aria-label="عن جيل"><img class="site-logo" src="assets/logo.png" alt="جيل"></a></h1></div>
    ${gamesSection}
    <div class="chip-row">${chips}</div>
    <div class="video-grid">${grid}</div>
  `;

  app.querySelectorAll('.chip').forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.cat;
      renderHome();
    });
  });
}

/* ---------- صفحة القناة: كل فيديوهات القناة (تُفتح من "شوف الكل") ---------- */
function renderChannelPage(channelId) {
  const channel = findChannel(channelId);
  if (!channel) return renderHome();

  document.title = channel.name + " - جيل";

  const cards = channel.videos.length
    ? channel.videos.map(v => videoCardHTML(channel, v)).join('')
    : `<p class="empty-state">لا توجد فيديوهات في هذه القناة بعد.</p>`;

  app.innerHTML = `
    <div class="top-bar">
      <h1>${escapeHTML(channel.name)}</h1>
      <a class="back-button" href="#/">&#8594; الرئيسية</a>
    </div>
    <div class="video-grid">${cards}</div>
  `;
}

/* ---------- صفحة التشغيل ---------- */
function renderWatchPage(channelId, videoId) {
  const channel = findChannel(channelId);
  const video = findVideo(channel, videoId);
  if (!channel || !video) return renderHome();

  document.title = video.title + " - جيل";

  const placeholder = isPlaceholderId(video.youtubeId);

  app.innerHTML = `
    <div class="top-bar">
      <h1>مشاهدة</h1>
      <a class="back-button" href="#/">&#8594; الرئيسية</a>
    </div>
    <div class="player-wrap">
      <div class="player-frame" id="playerFrame">
        ${placeholder
          ? `<div class="end-overlay" style="position:absolute;background:#1a1a1a;"><span class="emoji">🎬</span><p>الفيديو غير جاهز بعد. أضيفي رابط يوتيوب في data.js</p></div>`
          : `<div id="ytplayer"></div><div class="click-shield" id="clickShield"><span class="toggle-icon" id="toggleIcon">▶</span></div><button class="fullscreen-btn" id="fullscreenBtn" aria-label="تكبير الشاشة">⛶</button>`}
      </div>
    </div>
    <div class="watch-meta">
      <p class="player-title">${escapeHTML(video.title)}</p>
      ${placeholder ? '' : `
      <div class="watch-progress">
        <div class="watch-progress-bar"><div class="watch-progress-fill" id="watchProgressFill"></div></div>
        <span class="watch-progress-time" id="watchProgressTime">0:00 / 0:00</span>
      </div>`}
      <a class="watch-channel-link" href="#/channel/${channel.id}">
        ${avatarHTML(channel, 'channel-avatar-lg')}
        <span class="channel-name">${escapeHTML(channel.name)}</span>
      </a>
    </div>
  `;

  if (!placeholder) {
    createPlayer(video.youtubeId, channel);
    document.getElementById('clickShield').addEventListener('click', toggleShieldPlay);
    document.getElementById('fullscreenBtn').addEventListener('click', toggleFullscreen);
  }
}

/* تكبير الفيديو: نكبّر الحاوية كاملة (الفيديو + الطبقة الشفافة) مو الفيديو لحاله
   عشان الطبقة الشفافة تفضل تحمي حتى بوضع ملء الشاشة */
function toggleFullscreen() {
  const frame = document.getElementById('playerFrame');
  if (!frame) return;
  if (!document.fullscreenElement) {
    if (frame.requestFullscreen) frame.requestFullscreen();
    else if (frame.webkitRequestFullscreen) frame.webkitRequestFullscreen();
  } else {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  }
}

/* الطبقة الشفافة فوق الفيديو: تمنع وصول الضغطة لشعار/اسم يوتيوب
   وتحوّلها إلى تشغيل/إيقاف عادي بدل ما تفتح يوتيوب نفسه */
function toggleShieldPlay() {
  if (!ytPlayer || !ytPlayer.getPlayerState) return;
  const icon = document.getElementById('toggleIcon');
  const state = ytPlayer.getPlayerState();
  if (state === YT.PlayerState.PLAYING) {
    ytPlayer.pauseVideo();
    icon.textContent = '▶';
  } else {
    ytPlayer.playVideo();
    icon.textContent = '⏸';
  }
  icon.classList.add('show');
  clearTimeout(window._iconTimer);
  window._iconTimer = setTimeout(() => icon.classList.remove('show'), 500);
}

/* ---------- إنشاء مشغل يوتيوب ومراقبة نهاية الفيديو + تتبع التقدم ---------- */
let watchProgressInterval = null;
let currentWatchVideoId = null;

function stopWatchProgressTracking() {
  if (watchProgressInterval) {
    clearInterval(watchProgressInterval);
    watchProgressInterval = null;
  }
}

function startWatchProgressTracking() {
  stopWatchProgressTracking();
  watchProgressInterval = setInterval(() => {
    const fill = document.getElementById('watchProgressFill');
    const timeEl = document.getElementById('watchProgressTime');

    // كشف الإعلانات: أثناء عرض إعلان، الفيديو المُشغّل فعليًا يختلف عن الفيديو المطلوب
    // وقتها نعطّل الطبقة الشفافة وزر التكبير مؤقتًا (زر تخطي الإعلان الأصلي بنفس مكان زر التكبير - تحت يمين)
    const frame = document.getElementById('playerFrame');
    if (frame && ytPlayer && ytPlayer.getVideoData) {
      try {
        const data = ytPlayer.getVideoData();
        const isAd = !!(data && data.video_id && currentWatchVideoId && data.video_id !== currentWatchVideoId);
        frame.classList.toggle('ad-playing', isAd);
      } catch (e) {}
    }

    // إذا انتقلنا لصفحة ثانية، هذي العناصر ما تكون موجودة، فنوقف المؤقت تلقائياً
    if (!fill || !timeEl || !ytPlayer || !ytPlayer.getDuration) {
      stopWatchProgressTracking();
      return;
    }
    const duration = ytPlayer.getDuration() || 0;
    const current = ytPlayer.getCurrentTime ? ytPlayer.getCurrentTime() : 0;
    if (duration > 0) {
      fill.style.width = Math.min(100, (current / duration) * 100) + '%';
    }
    timeEl.textContent = `${formatClock(current)} / ${formatClock(duration)}`;
  }, 500);
}

function createPlayer(youtubeId, channel) {
  if (ytPlayer && ytPlayer.destroy) {
    try { ytPlayer.destroy(); } catch (e) {}
  }
  stopWatchProgressTracking();
  currentWatchVideoId = youtubeId;

  function build() {
    ytPlayer = new YT.Player('ytplayer', {
      videoId: youtubeId,
      host: 'https://www.youtube-nocookie.com',
      playerVars: {
        rel: 0,
        modestbranding: 1,
        iv_load_policy: 3,
        fs: 0,
        controls: 0,
        playsinline: 1,
        autoplay: 1
      },
      events: {
        onReady: () => startWatchProgressTracking(),
        onStateChange: (e) => {
          if (e.data === YT.PlayerState.ENDED) {
            stopWatchProgressTracking();
            showEndOverlay(channel);
          }
        }
      }
    });
  }

  if (window.YT && window.YT.Player) {
    build();
  } else {
    if (!document.getElementById('yt-iframe-api')) {
      const tag = document.createElement('script');
      tag.id = 'yt-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
    }
    window.onYouTubeIframeAPIReady = build;
  }
}

function showEndOverlay(channel) {
  const frame = document.getElementById('playerFrame');
  if (!frame) return;
  const overlay = document.createElement('div');
  overlay.className = 'end-overlay';
  overlay.innerHTML = `
    <span class="emoji">🎉</span>
    <p>خلص الفيديو! أحسنت</p>
    <div class="end-actions">
      <a class="big-button" href="#/">الرئيسية</a>
    </div>
  `;
  frame.appendChild(overlay);
}
