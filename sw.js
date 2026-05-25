/* Service Worker — Agenda Corporativa PWA */
const CACHE = 'agenda-v3';
const PRECACHE = [
  './',
  './index.html',
  './app.js',
  './styles.css',
  './manifest.json',
  './icon-192.svg',
  './icon-512.svg',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

/* Network-first para la API de GitHub; cache-first para assets locales */
self.addEventListener('fetch', e => {
  if (e.request.url.includes('api.github.com') || e.request.url.includes('cdn.tailwindcss.com')) {
    return; // siempre red para API y CDN
  }
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
