const zlib = require("zlib");

function gzipContent(content) {
  return zlib.gzipSync(content);
}

module.exports = { gzipContent };
