// adapted from https://sebhastian.com/nodejs-download-file/

const http = require('http'); // or 'https' for https:// URLs
const homedir = require('os').homedir();
var dir = '/.LibgenDesktop/Library/'
const fs = require('fs')
var log='library.json'
var downloadPath = homedir+dir
var logPath = downloadPath+log

function download(filename, downloadLink, downloadPath) {
    const file = fs.createWriteStream(downloadPath+filename);
    const request = http.get(downloadLink, function(response) {
    response.pipe(file);

   // after download completed close filestream
   file.on("finish", () => {
       file.close();
       console.log("Download Completed");
   });
});

}


module.exports = { download };

