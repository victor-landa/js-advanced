import MediaPlayer from '../../MediaPlayer';
import Ads, { Ad } from './Ads';

// En este archivo vamos a inicializar el plugin
class AdsPlugin {
  private ads: Ads;
  private player: MediaPlayer;
  private media: HTMLMediaElement;
  private currentAd: Ad;

  constructor() {
    this.ads = Ads.getInstance();
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
  }

  // Todos los plugins tienen un método público que es run()
  run(player: MediaPlayer){
    this.player = player;
    this.media = this.player.media;
    this.media.addEventListener('timeupdate', this.handleTimeUpdate)
  }

  private handleTimeUpdate() {
    const currentTime = Math.floor(this.media.currentTime);
    // Si currentTime se dividie entre 30 perfectamenre la validación se cumple
    if(currentTime % 30 === 0) {
      this.renderAd();
    }
  }

  private renderAd() {
    if(this.currentAd) {
      return;
    }
    const ad = this.ads.getAd();
    this.currentAd = ad;
    console.log(this.currentAd);
  }
}

export default AdsPlugin;

// Los HTMLMediaElements tienen un event que se llama timeUpdate,
// timeUpdate nos notifica cada que cambió el tiempo del mediaElement