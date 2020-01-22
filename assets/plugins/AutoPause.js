class AutoPause {
  constructor() {
    this.threshold = 0.25;
    this.isVisible = false;
    // Vamos a hacer permanente el this a la instancia del objeto.
    this.handleIntersection = this.handleIntersection.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
  }

  run(player) {
    this.player = player;
    const observer = new IntersectionObserver(this.handleIntersection, {
      threshold: this.threshold,
    });

    observer.observe(this.player.media);

    document.addEventListener("visibilitychange", this.handleVisibilityChange);
  }

  handleIntersection(entries) {
    const entry = entries[0];
    this.isVisible = entry.intersectionRatio <= this.threshold;
    if(!this.isVisible) {
      this.player.play();
    } else {
      this.player.pause();
    }
  }

  handleVisibilityChange() {
    const isVisibleTab = document.visibilityState == "visible";
    if (isVisibleTab && !this.isVisible) {
      this.player.play(); 
    } else {
      this.player.pause();
    }
  }
  
}

export default AutoPause;