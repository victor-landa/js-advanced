class MediaPlayer {
  // Cuando tenemos la etqiueta video en HTML esa etiqueta representa
  // un tipo HTMLMediaElement.
  media: HTMLMediaElement;

  plugins: Array<any>;

  constructor(config) {
    this.media = config.el;
    // Damos un valor inicial al array.
    this.plugins = config.plugins || [];
    // Antes escribiamos _initPlugin para comunicar que es privado, no se supone que
    // alguien lo llame directamente, excepto la misma clase.
    this.initPlugins();
  }

  private initPlugins() {
    this.plugins.forEach(plugin => {
      plugin.run(this);
    });
  }

  play() {
    this.media.play();
  }

  pause() {
    this.media.pause();
  }

  mute() {
    this.media.muted = true;
  }
  
  unmute() {
    this.media.muted = false;
  }
}

export default MediaPlayer;