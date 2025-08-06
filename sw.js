// sw.js - Service Worker for Offline Capabilities

const CACHE_NAME = 'udith-portfolio-cache-v2'; // Updated cache version
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/picofme.webp',
    '/sun.webp',
    '/moon.webp',
    '/apple-touch-icon.png',
    '/favicon-32x32.png',
    '/favicon-16x16.png',
    '/site.webmanifest',
    '/favicon.ico',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap'
];

// Install event: opens the cache and adds main assets to it
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache and adding assets');
                return cache.addAll(urlsToCache);
            })
    );
});

// Activate event: cleans up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event: serves assets from cache first, falling back to network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                // Not in cache - fetch from network
                return fetch(event.request).then(
                    (networkResponse) => {
                        // Check if we received a valid response
                        if(!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                            return networkResponse;
                        }

                        // IMPORTANT: Clone the response. A response is a stream
                        // and because we want the browser to consume the response
                        // as well as the cache consuming the response, we need
                        // to clone it so we have two streams.
                        const responseToCache = networkResponse.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return networkResponse;
                    }
                );
            })
    );
});
