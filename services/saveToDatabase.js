const fs = require("fs");
const homedir = require("os").homedir();
var dir = "/.LibgenDesktop/Library/";
var log = "library.json";
var downloadPath = homedir + dir;
var downloadPath = downloadPath.replace(/\\/g, "\\\\");
var logPath = downloadPath + log;

async function save(bookname, filesize, author, coverLink, filename) {
  // should create JSOn if does not exist
  var books = JSON.parse(fs.readFileSync(logPath).toString("utf-8"));
  books[filename] = {};
  var itemInfo = {
    bookName: bookname,
    coverLink: coverLink,
    author: author,
    filesize: filesize,
    filename: filename,
    downloadPath: downloadPath,
  };
  books[filename].itemInfo = itemInfo;
  fs.closeSync(fs.openSync(logPath, "a"));
  var jsonString = JSON.stringify(books);
  fs.writeFile(logPath, jsonString, "utf8", function (err) {
    if (err) throw err;
    console.log("Saved to database.");
  });
}

module.exports = { save };
