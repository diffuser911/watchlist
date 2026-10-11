const CACHE_NAME = 'tracklist-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Let external API calls (TVMaze, OMDb, posters) pass straight through to the network
  if (event.request.url.includes('api') || event.request.url.includes('omdbapi')) {
    return;
  }
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});