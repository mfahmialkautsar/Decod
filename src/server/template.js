module.exports = function template(title, initialState = {}, content = '') {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Decod, Ini Steganography" />
    <meta name="author" content="Fahmi Al">
    <link rel="manifest" href="/manifest.json" />
    <link rel="stylesheet" href="/main.css" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <title>${title}</title>
  </head>
  <body>
    <div id="root">${content}</div>
  </body>
  <script>
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("service-worker.js")
      });
    }
  </script>
  <script>
  window.__STATE__ = ${JSON.stringify(initialState)}
  </script>
  <script src="/main.js"></script>
  </html>`;
};
