/* ============================================================
   StockControl — service worker
   Guarda una copia de los archivos de la aplicación para que
   pueda abrirse aunque el teléfono no tenga conexión, que es
   una situación habitual dentro de una bodega.
   ============================================================ */

const CACHE = "stockcontrol-v3";

const ARCHIVOS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./assets/app.css",
  "./assets/app.js",
  "./assets/icon-192.png",
  "./assets/icon-512.png"
];

// Al instalarse, guarda los archivos propios de la aplicación.
self.addEventListener("install", (evento) => {
  evento.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(ARCHIVOS))
      .then(() => self.skipWaiting())
  );
});

// Al activarse, elimina versiones anteriores de la caché.
self.addEventListener("activate", (evento) => {
  evento.waitUntil(
    caches.keys()
      .then((nombres) => Promise.all(
        nombres.filter((n) => n !== CACHE).map((n) => caches.delete(n))
      ))
      .then(() => self.clients.claim())
  );
});

// Responde primero desde la caché y, si no está, va a la red.
self.addEventListener("fetch", (evento) => {
  if (evento.request.method !== "GET") return;

  evento.respondWith(
    caches.match(evento.request).then((guardado) => {
      if (guardado) return guardado;

      return fetch(evento.request)
        .then((respuesta) => {
          // Guarda también los archivos de Ionic que llegan del CDN.
          if (respuesta.ok && evento.request.url.startsWith("http")) {
            const copia = respuesta.clone();
            caches.open(CACHE).then((cache) => cache.put(evento.request, copia));
          }
          return respuesta;
        })
        .catch(() => caches.match("./index.html"));
    })
  );
});
