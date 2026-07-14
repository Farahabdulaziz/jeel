/* ============================================================
   تطبيق بسيط بدون أي مكتبات - توجيه بالـ hash فقط
   3 شاشات: الرئيسية -> صفحة القناة -> صفحة التشغيل
   لا يوجد بحث، لا يوجد اقتراحات فيديوهات ثانية، لا يمكن لأي
   طفل فتح قناة أو فيديو غير موجود ضمن data.js
   ============================================================ */

const app = document.getElementById('app');
let ytPlayer = null;

function findChannel(channelId) {
  return CHANNELS.find(c => c.id === channelId);
}
function findVideo(channel, videoId) {
  return channel ? channel.videos.find(v => v.id === videoId) : null;
}
function isPlaceholderId(id) {
  return !id || id.startsWith('REPLACE_ME');
}
function thumbUrl(youtubeId) {
  return `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
}
function initial(name) {
  return (name || '?').trim().charAt(0);
}

/* تنسيق ثواني إلى "دقائق:ثواني" أو "ساعات:دقائق:ثواني" */
function formatClock(totalSeconds) {
  const s = Math.max(0, Math.floor(totalSeconds || 0));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  }
  return `${m}:${String(sec).padStart(2, '0')}`;
}
function avatarHTML(channel, sizeClass) {
  const cls = sizeClass ? `channel-avatar ${sizeClass}` : 'channel-avatar';
  if (channel.avatar) {
    return `<img class="${cls}" src="${channel.avatar}" alt="${escapeHTML(channel.name)}">`;
  }
  return `<div class="${cls}" style="background:${channel.color}">${initial(channel.name)}</div>`;
}

/* تنظيف أي نص قبل إدخاله بالـ HTML - يمنع عناوين فيها & أو < أو " من كسر بنية الصفحة */
function escapeHTML(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* أداة عامة: خلط ترتيب مصفوفة (تُستخدم بلعبة الذاكرة ولعبة التركيبة) */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
