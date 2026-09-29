import http from "http";
import { join, extname, sep } from "path";
import { readFile } from "fs";

const server = http.createServer((request, response) => {
  const url = request.url === "/" ? "/index.html" : request.url;
  const filePath = join("public", url);

  if (!filePath.startsWith("public" + sep)) {
    response.writeHead(403, { "Content-Type": "text/plain" });
    response.end("Forbidden");
    return;
  }

  const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".png": "image/png",
    ".js": "text/javascript",
  };

  const ext = extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || "application/octet-stream";

  readFile(filePath, (error, file) => {
    if (error) {
      readFile("public/404.html", (error, file) => {
        response.writeHead(404, { "Content-Type": "text/html" });
        response.end(file, "utf-8");
      });
      return;
    }
    response.writeHead(200, { "Content-Type": contentType });
    response.end(file, "utf-8");
  });
});

server.listen(3001, () => console.log("Server is listening on port 3001"));
