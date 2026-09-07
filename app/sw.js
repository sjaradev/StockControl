/* ============================================================
   StockControl — service worker

   Guarda una copia de la aplicación para que pueda abrirse sin
   conexión, que es una situación habitual dentro de una bodega.

   Importante: para los archivos propios se consulta primero la
   red. Con la estrategia contraria, una vez guardada la copia el
   navegador nunca volvía a pedir los archivos y los cambios
   publicados no llegaban al usuario.
   ============================================================ */

const VERSION = "v5";
const CACHE = "stockcontrol-" + VERSION;

const ARCHIVOS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./assets/app.css",
  "./assets/app.js",
  "./assets/icon-192.png",
  "./assets/icon-512.png"
];

// Al instalarse, guarda una copia de los archivos propios de la aplicación.
// No se guardan los del CDN: de eso se encarga el navegador.
self.addEventListener("install", (evento) => {
  evento.waitUntil(
    caches.open(CACHE)
      // "reload" obliga a pedir cada archivo al servidor, sin usar la
      // copia que el navegador pueda tener guardada.
      .then((cache) => cache.addAll(
        ARCHIVOS.map((ruta) => new Request(ruta, { cache: "reload" }))
      ))
      .then(() => self.skipWaiting())
  );
});

// Al activarse, elimina las versiones anteriores de la caché.
self.addEventListener("activate", (evento) => {
  evento.waitUntil(
    caches.keys()
      .then((nombres) => Promise.all(
        nombres.filter((n) => n !== CACHE).map((n) => caches.delete(n))
      ))
      .then(() => self.clients.claim())
  );
});

function guardarCopia(peticion, respuesta) {
  if (respuesta && respuesta.ok) {
    const copia = respuesta.clone();
    caches.open(CACHE).then((cache) => cache.put(peticion, copia));
  }
  return respuesta;
}

self.addEventListener("fetch", (evento) => {
  if (evento.request.method !== "GET") return;

  const url = new URL(evento.request.url);
  const esPropio = url.origin === self.location.origin;

  if (esPropio) {
    // Archivos de la aplicación: primero la red, para que cada
    // publicación se vea de inmediato. Si no hay señal, la copia.
    // "no-cache" obliga a preguntar al servidor si el archivo cambió.
    const fresca = new Request(evento.request.url, { cache: "no-cache" });
    evento.respondWith(
      fetch(fresca)
        .then((respuesta) => guardarCopia(evento.request, respuesta))
        .catch(() => caches.match(evento.request)
          .then((guardado) => guardado || caches.match("./index.html")))
    );
    return;
  }

  // Los archivos de Ionic llegan desde un CDN y el framework los carga en
  // decenas de fragmentos que resuelve entre sí. Al servirlos desde la
  // caché, el arranque quedaba a medias y ningún componente se dibujaba.
  // Por eso el service worker no interviene: el navegador los pide
  // directamente y aplica su propia caché, que sí los maneja bien.
});
