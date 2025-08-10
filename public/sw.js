const CACHE_NAME = 'greenbank-tutor-v1.1';
const urlsToCache = [
  '/',
  '/index.html',
  '/script.js',
  '/api/version'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Check if we have a cached version
        if (response) {
          // For HTML, JS, and CSS files, always check network first
          if (event.request.url.includes('.html') || 
              event.request.url.includes('.js') || 
              event.request.url.includes('.css') ||
              event.request.url.includes('/api/')) {
            return fetch(event.request)
              .then(networkResponse => {
                // Only cache successful responses
                if (networkResponse.status === 200) {
                  // Clone the response before using it
                  const responseToCache = networkResponse.clone();
                  // Update cache with fresh content
                  caches.open(CACHE_NAME)
                    .then(cache => cache.put(event.request, responseToCache))
                    .catch(err => console.log('Cache update failed:', err));
                }
                return networkResponse;
              })
              .catch(() => {
                // If network fails, return cached version
                return response;
              });
          }
          return response;
        }
        return fetch(event.request);
      })
      .catch(error => {
        console.log('Fetch failed:', error);
        // Return a basic response for failed requests
        return new Response('Network error', { status: 503 });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 