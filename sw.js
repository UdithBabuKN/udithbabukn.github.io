// sw.js - Service Worker for Offline Capabilities

const CACHE_NAME = 'udith-portfolio-cache-v3'; // Updated cache version
const urlsToCache = [
    '/',
    '/index.html',
    '/blog.html',
    '/style.css',
    '/script.js',
    '/blog_script.js',
    '/picofme.webp',
    '/sun.webp',
    '/moon.webp',
    '/apple-touch-icon.png',
    '/favicon-32x32.png',
    '/favicon-16x16.png',
    '/site.webmanifest',
    '/favicon.ico',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap',
    '/blog/what-is-digital-marketing.html',
    '/blog/what-is-seo.html',
    '/blog/what-is-content-marketing.html',
    '/blog/what-is-a-sales-funnel.html',
    '/blog/what-is-a-crm.html',
    '/blog/b2b-vs-b2c-marketing.html',
    '/blog/what-is-lead-generation.html',
    '/blog/what-is-ppc.html',
    '/blog/what-is-social-media-marketing.html',
    '/blog/what-is-sales-enablement.html',
    '/blog/how-to-create-content-marketing-strategy.html',
    '/blog/seo-for-beginners.html',
    '/blog/how-to-build-an-email-list.html',
    '/blog/how-to-create-social-media-plan.html',
    '/blog/your-first-ppc-campaign.html',
    '/blog/long-tail-keywords-strategy.html',
    '/blog/how-to-write-a-blog-post.html',
    '/blog/affiliate-marketing-for-beginners.html',
    '/blog/mobile-marketing-strategy-2025.html',
    '/blog/how-to-use-marketing-analytics.html',
    '/blog/beginners-guide-to-ab-testing.html',
    '/blog/how-to-use-local-seo.html',
    '/blog/video-marketing-101-youtube.html',
    '/blog/influencer-marketing-guide.html',
    '/blog/guide-to-google-keyword-planner.html',
    '/blog/how-to-build-a-sales-funnel.html',
    '/blog/generate-b2b-sales-leads.html',
    '/blog/guide-to-spin-selling.html',
    '/blog/how-to-use-crm-for-sales.html',
    '/blog/the-challenger-sale-explained.html',
    '/blog/create-sales-enablement-plan.html',
    '/blog/open-ended-sales-questions.html',
    '/blog/lead-qualification-bant-framework.html',
    '/blog/7-stages-of-sales-process.html',
    '/blog/solution-selling-101.html',
    '/blog/how-to-write-sales-playbook.html',
    '/blog/top-10-sales-blogs-2025.html',
    '/blog/handle-sales-objections.html',
    '/blog/sales-vs-marketing-alignment.html',
    '/blog/what-is-a-sales-cadence.html',
    '/blog/beginner-seo-questions-answered.html',
    '/blog/beginner-email-marketing-questions.html',
    '/blog/social-media-marketing-questions.html',
    '/blog/top-digital-marketing-blogs.html',
    '/blog/common-crm-questions.html',
    '/blog/lead-generation-questions-for-startups.html',
    '/blog/how-to-conduct-content-audit.html',
    '/blog/understanding-marketing-attribution.html',
    '/blog/how-to-create-buyer-persona.html',
    '/blog/digital-marketing-sales-glossary.html'
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
                        if(!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic' && !event.request.url.startsWith('https://')) {
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
