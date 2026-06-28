// DEV MODE - KILLER SERVICE WORKER
// This service worker immediately deletes old caches and bypasses network.

self.addEventListener('install', event => {
    // Immediately install the new service worker
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    console.log('Deleting cache:', cacheName);
                    return caches.delete(cacheName);
                })
            );
        }).then(() => {
            // Take control of all clients immediately
            return self.clients.claim();
        })
    );
});

self.addEventListener('fetch', event => {
    // Always fetch from network to ensure latest React dev build is served
    event.respondWith(fetch(event.request));
});
