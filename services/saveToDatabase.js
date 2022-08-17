const fs = require('fs')
const http = require('http'); // or 'https' for https:// URLs
const homedir = require('os').homedir();
var dir = '/.LibgenDesktop/Library/'
var log='library.csv'
var downloadPath = homedir+dir
var logPath = downloadPath+log

function save(bookname,filesize,author,coverLink,filename) {
    fs.closeSync(fs.openSync(logPath, 'a'))
    console.log(filename)
    data=bookname+','+filesize+','+author+','+coverLink+','+filename+'\n' 
    console.log(data)
    fs.appendFile(logPath, data, function (err) {
        if (err) throw err;
        console.log('Saved to database.');
      });
}

module.exports = { save };
