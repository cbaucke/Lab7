// sw.js - Service Worker

// You will need 3 event listeners:
//   - One for installation
//   - One for activation ( check out MDN's clients.claim() for this step )
//   - One for fetch requests

const CACHE_NAME = "lab7Cache";
let toCache = [
    "https://cse110lab6.herokuapp.com/entries"
];

//Installation
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(toCache);
            })
    );
});

//Activation
self.addEventListener("activate", (event) => {
    event.waitUntil(clients.claim());
});

//Fetch requests
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request)
          .then(function(response) {
            // Cache hit - return response
            if (response) {
              return response;
            }
            return fetch(event.request);
          }
        )
    );
});