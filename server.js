// Minimal zero-dependency static server for Railway.
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json",
};

http
  .createServer((req, res) => {
    // strip query string, then resolve inside ROOT so ../ cannot escape it
    const raw = decodeURIComponent(req.url.split("?")[0]);
    const rel = raw === "/" ? "index.html" : raw.replace(/^\/+/, "");
    const file = path.resolve(ROOT, rel);

    if (!file.startsWith(ROOT + path.sep) && file !== path.join(ROOT, "index.html")) {
      res.writeHead(403).end("Forbidden");
      return;
    }

    fs.readFile(file, (err, body) => {
      if (err) {
        // unknown path -> serve the app so deep links still land somewhere useful
        fs.readFile(path.join(ROOT, "index.html"), (e2, home) => {
          if (e2) {
            res.writeHead(404, { "Content-Type": "text/plain" }).end("Not found");
          } else {
            res.writeHead(200, { "Content-Type": TYPES[".html"] }).end(home);
          }
        });
        return;
      }
      res.writeHead(200, {
        "Content-Type": TYPES[path.extname(file).toLowerCase()] || "application/octet-stream",
        "Cache-Control": "no-cache",
      });
      res.end(body);
    });
  })
  .listen(PORT, "0.0.0.0", () => {
    console.log(`MPF job sheets wireframe listening on ${PORT}`);
  });
