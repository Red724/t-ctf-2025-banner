self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    if (request.method === 'GET' && url.pathname === '/' && url.origin === location.origin) {
        event.respondWith(
            fetch('/my-index.html') // будет подменён через Local Overrides
        );
        console.log("Подменяем /index.html");
    } else {
        // Всё остальное уходит на реальный сервер
        event.respondWith(fetch(request));
    }
});