const net = require("net");
const fs = require("fs");
const config = require("./config/config.json");
const echoRoute = require("./routes/echo.js");
const filesRoute = require("./routes/files.js");
const userAgentRoute = require("./routes/userAgent.js");

const server = net.createServer((socket) => {
  let db = "";

  socket.on("data", (data) => {
    db += data.toString(); // Accumulate data from the socket
    if (db.includes("\r\n")) {
      let request = db.split("\r\n"); // Split the request by newlines
      let [method, path] = request[0].split(" "); // Extract method and path

      // Route requests based on the path
      if (path === "/") {
        socket.write("HTTP/1.1 200 OK\r\n\r\n");
      } else if (path.includes("/echo/")) {
        echoRoute(socket, method, path, request);
      } else if (path.includes("/user-agent")) {
        userAgentRoute(socket, method, path, request);
      } else if (path.includes("/files/")) {
        filesRoute(socket, method, path, request, config.fileDirectory);
      } else {
        socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
      }

      socket.end(); // End the socket connection after responding
    }
  });

  socket.on("close", () => {
    socket.end(); // Properly close the socket connection
  });

  socket.on("error", (err) => {
    console.error("Socket error:", err);
  });
});

server.listen(config.port, config.host, () => {
  console.log(`Server is listening on tcp://${config.host}:${config.port}`);
});
