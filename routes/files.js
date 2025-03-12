const fs = require("fs");
const path = require("path");
const { fileExists, readFile, writeFile } = require("../utils/fileUtils.js");

function handleFilesRoute(socket, method, reqPath, request, directory) {
  const fileName = reqPath.split("/files")[1];
  const filePath = path.join(directory, fileName);

  if (method === "GET") {
    if (fileExists(filePath)) {
      let data = readFile(filePath);
      socket.write(
        `HTTP/1.1 200 OK\r\nContent-Type: application/octet-stream\r\nContent-Length: ${data.length}\r\n\r\n${data}`
      );
    } else {
      socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
    }
  } else if (method === "POST") {
    let data = request[request.length - 1];
    writeFile(filePath, data);
    socket.write(`HTTP/1.1 201 Created\r\n\r\n`);
  } else {
    socket.write("HTTP/1.1 405 Method Not Allowed\r\n\r\n");
  }
}

module.exports = handleFilesRoute;
