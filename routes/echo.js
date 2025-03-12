const zlib = require("zlib");

function handleEchoRoute(socket, method, path, request) {
  const content = path.split("/echo/")[1];
  let acceptEncoding = request.find((i) => i.includes("Accept-Encoding"));

  if (acceptEncoding) {
    let cE = acceptEncoding.replace("Accept-Encoding:", "").trim();
    let encodingBody = zlib.gzipSync(content);

    if (cE !== "invalid-encoding" && cE.includes("gzip")) {
      socket.write(
        `HTTP/1.1 200 OK\r\nContent-Encoding: gzip\r\nContent-Type: text/plain\r\nContent-Length: ${encodingBody.length}\r\n\r\n`
      );
      socket.write(encodingBody);
    } else {
      socket.write(`HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\n${content}`);
    }
  } else {
    socket.write(
      `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${content.length}\r\n\r\n${content}`
    );
  }
}

module.exports = handleEchoRoute;
