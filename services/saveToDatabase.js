const fs = require('fs')
const http = require('http'); // or 'https' for https:// URLs
const homedir = require('os').homedir();
var dir = '/.LibgenDesktop/Library/'
var log='library.csv'
var downloadPath = homedir+dir
var downloadPath= downloadPath.replace(/\\/g, "\\\\");
var logPath = downloadPath+log

function save(bookname,filesize,author,coverLink,filename) {
    fs.closeSync(fs.openSync(logPath, 'a'))
    //author=author.replace(new RegExp(',','g'),'-')
    //bookname=bookname.replace(new RegExp(',','g'),'-')
    //filename=filename.replace(new RegExp(',','g'),'-')
    data=bookname+'!'+author+'!'+coverLink+'!'+filename+'!'+downloadPath+'\n' 
    fs.appendFile(logPath, data, function (err) {
        if (err) throw err;
        console.log('Saved to database.');
      });
}

module.exports = { save };
