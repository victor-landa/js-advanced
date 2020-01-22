const VERSION = 'v1';

// Devtools ofrecen herramientas para trabajar con Service Workers
// Los Service Workers se instalan, el navegador se encarga de instalarlo en el dispositivo del usuario, los SW van a vivir dentro del navegador.

// Dentro de Application -> Service Workers en las devtools vamos a activar Update on reload, esto lo que hace es que en la recarga de la página
// forza al Service Worker a actualizarse y lo activa.

// Self es como this, sólo que para los Service Workers
// Vamos a llamar un callback cuando el SW se instale, el callback va a recibir un evento.
self.addEventListener('install', event => {
  // Lo primero que haremos es crear un pre-caché. Le vamos a pasar una lista de recursos, assets que queremos que mantenga en caché.
  event.waitUntil(precache()); 
});

// Esta función se va a ejecutar cada que ocurra una petición / request.
self.addEventListener('fetch', event => {
  // Extraenos la petición.
  const request = event.request;
  // Sólo queremos utilizar las peticiones `get`.
  if(request.method !== 'GET') {
    return;
  }

  // Buscar en cache.
  event.respondWith(cachedResponse(request));
  // Actualizar el cache.
  event.waitUntil(updateCache(request));
});

async function precache() {
  // Para trabajar con cache tenemos que ocupar una parte de la API del DOM que se llama caches.
  // caches.open() nos da una instancia de cache que se va a llamar v1.
  const cache = await caches.open(VERSION);

  // Añadimos los recursos => 
  // Para terminos de los service workers es diferente hacer un request a / que a /index.html, aunque nos redirijan a la misma página, por eso ponemos ambos.
  // Ponemos return porque es una promesa y es justo lo que se espera con waitUntil()
  return cache.addAll([
    '/',
    '/index.html',
    '/assets/index.js',
    '/assets/MediaPlayer.js',
    '/assets/plugins/AutoPlay.js',
    '/assets/plugins/AutoPause.js',
    '/assets/index.css',
    '/assets/placeholder.mp4',
  ]);
}

async function cachedResponse(request) {
  // Obtenemos el cache
  const cache = await caches.open(VERSION);
  // Checamos si en nuestro cache tenemos alguna contestación a nuestro request.
  const response = await cache.match(request);
  // Si es undefined vamos a contestar con lo que nos de la red ya no es está en cache => ||
  // Si no agregamos el || y se llega a solicitar un archivo o un asset que no está en caché nunca obtendriamos ese file ya que estariamos contestando undefined.
  return response || fetch(request);
}

async function updateCache(request) {
  const cache = await caches.open(VERSION);
  // buscamos una copia actualizada.
  const response = await fetch(request);
  // Añadimos nuevo contenido al cache.
  return cache.put(request, response);
}