function getYtdPlayer() {
  const ytdPlayer = document.getElementById("ytd-player");
  if (ytdPlayer && ytdPlayer.getPlayer() !== null) {
    extendPlaybackSpeeds(ytdPlayer.getPlayer());
  } else {
    return false;
  }
}

function extendPlaybackSpeeds(player) {
  const ytPlayer = window._yt_player;
  if (ytPlayer) {
    for (const obj of Object.values(ytPlayer)) {
      for (const value of Object.values(obj)) {
        if (value && typeof value.getAvailablePlaybackRates === "function") {
          value.getAvailablePlaybackRates = () => [0.125, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4];
        }
      }
    }
  }
  if (player && sessionStorage.getItem("yt-player-playback-rate")) {
    player.setPlaybackRate(parseFloat(JSON.parse(sessionStorage.getItem("yt-player-playback-rate")).data));
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", getYtdPlayer);
} else {
  const observer = new MutationObserver(() => {
    if (getYtdPlayer() !== false) {
      observer.disconnect();
    }
  });
  observer.observe(document.body, {
    childList: true,
  });
}
