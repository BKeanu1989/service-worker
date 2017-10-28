self.addEventListener("fetch", function(event) {
	console.log("Fetch request for: ", event.request.url);

	// if (event.request.url.includes("/intern/images/cage-200x300.jpg")) {
	// 	event.respondWith(fetch("/intern/images/cage-200x300-color.jpg"));
	// }

	event.respondWith(
			fetch(event.request).catch(function() {
				return new Response("Welcome to the offline site");
			})
		)

})