var homePath = require("../services/setDownloadFolder");
var libraryData = homePath.downloadPath + "library.json";
const homedir = require("os").homedir();
var dir = "/.LibgenDesktop/";
var settingsFile = homedir+ dir + "settings.json";
const fsExtra = require('fs-extra');
const fs = require('fs');

async function checkForFile(fileName) {
    await fsExtra.ensureFile(fileName);
    fs.writeFileSync(fileName, "{}");
}

function createFiles() {
    fs.mkdirSync(homePath.downloadPath, { recursive: true });
    checkForFile(libraryData);
    checkForFile(settingsFile)
}

module.exports = { createFiles };
