// Cuando usamos scripts con type module hay que especificar la extensión.
import MediaPlayer from '@victorlanda/mediaplayer';
import AutoPlay from '@victorlanda/mediaplayer/lib/plugins/AutoPlay';
import AutoPause from '@victorlanda/mediaplayer/lib/plugins/AutoPause';
import Ads from '@victorlanda/mediaplayer/lib/plugins/Ads';

const video = document.querySelector("video");
const button: HTMLElement = document.querySelector("button");
const buttonSound: HTMLElement = document.querySelector("#audioVideo");

// Instanciamos al objeto pasando un objeto de configuración
const player = new MediaPlayer({ el: video, plugins: [
  // Autoplay va a ser una clase, por tanto hay que instanciarla.
  new AutoPlay(), new AutoPause(), new Ads()], 
});

button.onclick = () => {
  player.media.paused ? player.play() : player.pause();
  console.log(player.media.paused, 'Paused');
}

buttonSound.onclick = () => {
  player.media.muted ? player.unmute() : player.mute();
  console.log(player.media.muted, 'Muted');
}

// Con este if vamos a verificar si el navegador del usuario 
// les da apoyo a los service workers, 
// este es un feature reciente, no todos los navegadores lo manejan. 
if('serviceWorker' in navigator) {
  // Registramos el service worker.
  navigator.serviceWorker.register('/sw.js').catch(error => {
    console.log(error.message);
  });
}