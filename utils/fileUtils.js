const fs = require("fs");

function fileExists(filePath) {
  return fs.existsSync(filePath);
}

function readFile(filePath) {
  return fs.readFileSync(filePath).toString();
}

function writeFile(filePath, data) {
  fs.writeFileSync(filePath, data);
}

module.exports = { fileExists, readFile, writeFile };
