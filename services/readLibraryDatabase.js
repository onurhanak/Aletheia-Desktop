const fs = require("fs");
const { parse } = require("csv-parse");

var homePath = require("../services/setDownloadFolder");
var pathDownload = homePath.downloadPath;
var libraryData = homePath.downloadPath + "library.json";

async function readDatabase() {
  return new Promise(async function (resolve, reject) {
    var books = JSON.parse(fs.readFileSync(libraryData).toString("utf-8"));
    resolve(books);
  });
}

class Book {
  constructor(attrList) {
    this.title = attrList[0];
    this.author = attrList[1];
    this.coverLink = attrList[2];
    this.filename = attrList[3];
    this.path = attrList[4];
  }
}

module.exports = { readDatabase };
