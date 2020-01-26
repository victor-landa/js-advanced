import MediaPlayer from '../MediaPlayer';

class AutoPause {
  // threshold es una propiedad privada, las variables privadas no existen en JS, 
  // pero sí existen en TypeScript!

  // Esto nos permite que alguna otra función que importe AutoPause pueda leer este valor.
  private threshold: number;
  private isVisible: boolean;

  // MediaPlayer está haciendo referencia a un valor 
  // pero lo estamos utilizando como un tipo.
  player: MediaPlayer;

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

  private handleIntersection(entries: IntersectionObserverEntry[]) {
    const entry = entries[0];
    this.isVisible = entry.intersectionRatio <= this.threshold;
    if(!this.isVisible) {
      this.player.play();
    } else {
      this.player.pause();
    }
  }

  private handleVisibilityChange() {
    const isVisibleTab = document.visibilityState == "visible";
    if (isVisibleTab && !this.isVisible) {
      this.player.play(); 
    } else {
      this.player.pause();
    }
  }
  
}

export default AutoPause;