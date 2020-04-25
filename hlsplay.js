hlsPlay = (src) => {
  if (Hls.isSupported()) {
    var hls = new Hls();
    hls.loadSource(src);
    hls.attachMedia(hlsPlayer);
    hls.on(Hls.Events.MANIFEST_PARSED, function() {
      hlsPlayer.play();
    });
  }
  //se hls non è supportato (ios) utilizza il player integrato
  else if (hlsPlayer.canPlayType('application/vnd.apple.mpegurl')) {
    hlsPlayer.src = src;
    hlsPlayer.addEventListener('loadedmetadata', function() {
      hlsPlayer.play();
    });
  }
}
