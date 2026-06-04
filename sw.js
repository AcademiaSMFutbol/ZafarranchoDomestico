/* Service Worker — Agenda Corporativa PWA */
const CACHE = 'agenda-v8';
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
  if (e.request.url.includes('api.github.com') || e.request.url.includes('cdn.')) {
    return; // siempre red para API y CDN
  }
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});

/* Notificaciones programadas desde la app principal.
   El SW mantiene timers propios para sobrevivir a tabs inactivas. */
const _swTimers = new Map();

self.addEventListener('message', e => {
  if (!e.data || e.data.type !== 'SCHEDULE_NOTIF') return;
  const { id, title, body, fireAt } = e.data;
  if (_swTimers.has(id)) clearTimeout(_swTimers.get(id));
  const delay = fireAt - Date.now();
  if (delay <= 0) return;
  _swTimers.set(id, setTimeout(() => {
    _swTimers.delete(id);
    self.registration.showNotification(title, {
      body,
      icon:  './icon-192.svg',
      badge: './icon-192.svg',
      tag:   id,
      renotify: true,
    });
  }, delay));
});

/* Push desde servidor externo (ej. OneSignal / Web Push con VAPID) */
self.addEventListener('push', e => {
  let data = {};
  try { data = e.data ? e.data.json() : {}; } catch (_) {}
  const title   = data.titulo || data.title || 'Agenda SM Academia';
  const options = {
    body:  data.body  || data.message || '',
    icon:  './icon-192.svg',
    badge: './icon-192.svg',
    tag:   data.id    || 'agenda-push',
    data:  data,
  };
  e.waitUntil(self.registration.showNotification(title, options));
});

/* Al pulsar la notificación, enfocar o abrir la PWA */
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      const existing = list.find(c => c.url && c.focus);
      return existing ? existing.focus() : clients.openWindow('./');
    })
  );
});
