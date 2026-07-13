function renderGamePage(gameId) {
  const game = (typeof GAMES !== 'undefined') ? GAMES.find(g => g.id === gameId) : null;
  if (!game) return renderHome();
  document.title = game.title + " - جيل";

  if (game.id === 'memory') return renderMemoryGamePage(game);
  if (game.id === 'puzzle') return renderPuzzleGamePage(game);
  renderHome();
}

/* ---------- التوجيه ---------- */
function router() {
  if (timerExpired) return renderTimeUp();

  const hash = location.hash.replace(/^#\/?/, '');
  const parts = hash.split('/').filter(Boolean);

  if (parts.length === 0) return renderHome();
  if (parts[0] === 'about') return renderAboutPage();
  if (parts[0] === 'channel' && parts[1]) return renderChannelPage(parts[1]);
  if (parts[0] === 'watch' && parts[1] && parts[2]) return renderWatchPage(parts[1], parts[2]);
  if (parts[0] === 'game' && parts[1]) return renderGamePage(parts[1]);
  renderHome();
}

window.addEventListener('hashchange', router);
window.addEventListener('hashchange', updateTimerBadge);
window.addEventListener('DOMContentLoaded', router);
window.addEventListener('DOMContentLoaded', updateTimerBadge);
updateTimerBadge();
