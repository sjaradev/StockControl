/* ============================================================
   StockControl — service worker

   Guarda una copia de la aplicación para que pueda abrirse sin
   conexión, que es una situación habitual dentro de una bodega.

   Importante: para los archivos propios se consulta primero la
   red. Con la estrategia contraria, una vez guardada la copia el
   navegador nunca volvía a pedir los archivos y los cambios
   publicados no llegaban al usuario.
   ============================================================ */

const VERSION = "v4";
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

// Al instalarse, guarda una primera copia de los archivos propios.
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

  // Recursos externos como Ionic: primero la copia, porque su
  // dirección ya incluye el número de versión y no cambia.
  evento.respondWith(
    caches.match(evento.request).then((guardado) => {
      if (guardado) return guardado;
      return fetch(evento.request)
        .then((respuesta) => guardarCopia(evento.request, respuesta))
        .catch(() => guardado);
    })
  );
});
