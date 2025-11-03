/* ========================================
   SERVICE WORKER FOR PWA SUPPORT
   ========================================
   Enables Progressive Web App (PWA) functionality:
   - Offline caching of website files
   - Faster page loads on return visits
   - Works when internet connection is poor
   
   HOW IT WORKS:
   1. Install: Caches website files when first visited
   2. Fetch: Serves cached files when offline
   3. Activate: Cleans up old cache versions
*/

/* ========================================
   CACHE CONFIGURATION
   ========================================
*/

// Cache Name - Version identifier for cache management
// Change this when updating website to force cache refresh
const CACHE_NAME = 'chemistry-website-v1';

// URLs to Cache - List of files to store for offline access
// These files will be cached when service worker installs
const urlsToCache = [
    '/',                                    // Home page
    '/index.html',                          // Home page HTML
    '/css/style.css',                       // Main stylesheet
    '/js/main.js',                          // Main JavaScript
    '/js/periodic-table.js',                // Periodic table script
    '/js/equation-balancer.js',             // Equation balancer script
    '/js/quiz.js',                          // Quiz script
    '/about.html',                          // About page
    '/contact.html',                        // Contact page
    '/faq.html',                            // FAQ page
    '/branches/physical-chemistry.html',    // Physical chemistry branch
    '/branches/organic-chemistry.html',     // Organic chemistry branch
    '/branches/inorganic-chemistry.html',    // Inorganic chemistry branch
    '/branches/analytical-chemistry.html',  // Analytical chemistry branch
    '/branches/applied-chemistry.html'       // Applied chemistry branch
];

/* ========================================
   INSTALL EVENT
   ========================================
   Fires when service worker is first installed.
   Opens cache and stores all files listed in urlsToCache.
*/
self.addEventListener('install', event => {
    // waitUntil ensures service worker doesn't stop until caching is complete
    event.waitUntil(
        // Open cache with the specified name
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');  // Success message
                // Add all files to cache
                return cache.addAll(urlsToCache);
            })
            .catch(err => {
                // Log error if caching fails
                console.log('Cache failed:', err);
            })
    );
});

/* ========================================
   FETCH EVENT
   ========================================
   Intercepts all network requests.
   Serves cached files when available, otherwise fetches from network.
   Provides offline functionality.
*/
self.addEventListener('fetch', event => {
    // Respond with custom logic
    event.respondWith(
        // Try to find request in cache
        caches.match(event.request)
            .then(response => {
                // If found in cache, return cached version
                // Otherwise, fetch from network
                return response || fetch(event.request);
            })
            .catch(() => {
                // If network fails and cache fails, return home page
                return caches.match('/index.html');
            })
    );
});

/* ========================================
   ACTIVATE EVENT
   ========================================
   Fires when service worker becomes active.
   Cleans up old cache versions to save storage space.
*/
self.addEventListener('activate', event => {
    // Wait until cleanup is complete
    event.waitUntil(
        // Get all cache names
        caches.keys().then(cacheNames => {
            // Process all caches
            return Promise.all(
                cacheNames.map(cacheName => {
                    // If cache name is different from current version
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        // Delete old cache to free up space
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
