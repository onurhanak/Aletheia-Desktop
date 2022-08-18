// adapted from https://sebhastian.com/nodejs-download-file/

const http = require('http'); // or 'https' for https:// URLs
const homedir = require('os').homedir();
var dir = '/.LibgenDesktop/Library/'
const fs = require('fs')

var log='library.json'
var downloadPath = homedir+dir
var logPath = downloadPath+log

const stream = require('stream')
const util = require('util')
const axios = require('axios')

const finished = util.promisify(stream.finished);

async function download(filename, downloadLink, downloadPath) {
  const writer = fs.createWriteStream(downloadPath+filename);
  return axios({
    method: 'get',
    url: downloadLink,
    responseType: 'stream',
  }).then(response => {
    response.data.pipe(writer);
    console.log('download finished')
    return finished(writer); //this is a Promise
  });
}


module.exports = { download };

