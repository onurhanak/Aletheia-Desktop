const homedir = require('os').homedir();
var dir = '/.LibgenDesktop/Library/'
const fs = require('fs')
var log='library.json'
var downloadPath = homedir+dir
var logPath = downloadPath+log
function setDownloadPath() {
    if (!fs.existsSync(homedir+dir)){
        fs.mkdirSync(homedir+dir, {recursive:true});
    }


    
}

module.exports = { setDownloadPath, downloadPath };
