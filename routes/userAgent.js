function handleUserAgentRoute(socket, method, path, request) {
    let userAgent = request.find((i) => i.includes("User-Agent"));
    if (userAgent) {
      let body = userAgent.split(":")[1]?.trim();
      socket.write(
        `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${body.length}\r\n\r\n${body.trim()}`
      );
    } else {
      socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
    }
  }
  
  module.exports = handleUserAgentRoute;
  