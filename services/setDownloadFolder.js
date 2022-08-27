const fs = require("fs");
const homedir = require("os").homedir();
var dir = "/.LibgenDesktop/Library/";
var downloadPath = homedir + dir;

function setDownloadPath() {
  if (!fs.existsSync(homedir + dir)) {
    fs.mkdirSync(homedir + dir, { recursive: true });
  }
}

module.exports = { setDownloadPath, downloadPath };
