const fs = require('fs')
const http = require('http'); // or 'https' for https:// URLs
const homedir = require('os').homedir();
var dir = '/.LibgenDesktop/Library/'
var log='library.json'
var downloadPath = homedir+dir
var downloadPath= downloadPath.replace(/\\/g, "\\\\");
var logPath = downloadPath+log

function save(bookname,filesize,author,coverLink,filename) {
    var books = JSON.parse(fs.readFileSync(logPath).toString('utf-8'));
    var book = [];
    var itemInfo={
      bookName: bookname,
      coverLink: coverLink,
      author: author,
      filesize: filesize,
      downloadPath: downloadPath,
    }
    book.push({
      itemName: filename,
      itemInfo: itemInfo,
    })
    books.push(book)
    fs.closeSync(fs.openSync(logPath, 'a'))
    var jsonString= JSON.stringify(books);
    fs.writeFile(logPath, jsonString, 'utf8', function (err) {
      if (err) throw err;
      console.log('Saved to database.')
    });
}

module.exports = { save };
