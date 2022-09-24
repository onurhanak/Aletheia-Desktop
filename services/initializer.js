var homePath = require("../services/setDownloadFolder");
var libraryData = homePath.downloadPath + "library.json";
var settingsPath = homePath.downloadPath + "settings.json";
fs = require("fs");

function checkForFile(fileName) {
  fs.exists(fileName, function (exists) {
    if (exists) {
    } else {
      fs.writeFileSync(fileName, "{}");
    }
  });
}

function createFiles() {
    checkForFile(libraryData);
    checkForFile(settingsPath)
}


