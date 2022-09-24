var homePath = require("../services/setDownloadFolder");
var libraryData = homePath.downloadPath + "library.json";
var settingsPath = homePath.downloadPath + "settings.json";
const fsExtra = require('fs-extra');
const fs = require('fs')
function checkForFile(fileName) {
    fsExtra.ensureFile(fileName, err => {
      console.log(err) // => null
  });
    fs.writeFileSync(fileName, "{}");
}

function createFiles() {
    checkForFile(libraryData);
    checkForFile(settingsPath)
}

module.exports = { createFiles };
