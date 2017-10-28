
const CACHE_NAME = "sw-cache";
const CACHED_URLS = ["/index-offline.html", "/intern/js/app.js", "/intern/css/style.css", "/intern/images/cage-200x300.jpg", "/intern/images/cage-200x300-color.jpg"];

self.addEventListener("install", function(event) {
	event.waitUntil(
			caches.open(CACHE_NAME).then(function(cache) {
				return cache.addAll(CACHED_URLS);
			})
		)
})

self.addEventListener("fetch", function(event) {
	event.respondWith(
			fetch(event.request).catch(function() {
				return caches.match(event.request).then(function(response) {
					if(response) {
						return response;
					} else if(event.request.headers.get("accept").includes("text/html")) {
						return caches.match("/index-offline.html");
					}
				})
				caches.match("/index-offline.html").then(function(response) {
					if (response) {
						return response;
					}
				});
			})
		)
})