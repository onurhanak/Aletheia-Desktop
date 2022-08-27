const { unlink } = require('node:fs')
const fs = require('fs')
var homePath = require("../services/setDownloadFolder");
var libraryData = homePath.downloadPath + "library.json";
libraryData = libraryData.replace(/\\/g, "\\\\");

function deleteBook(filePath) {
    deleteBookFromDatabase(filePath)
    unlink(homePath.downloadPath+filePath, (err) => {
        try {
            console.log(filePath + ' Book successfully deleted');
        } catch {
            console.log('Some error occurred, better check it out.')
        }
    } 
    
    )
}

function deleteBookFromDatabase(filePath) {

    var books = JSON.parse(fs.readFileSync(libraryData).toString('utf-8'));
    delete books[filePath]
    var jsonString= JSON.stringify(books);
    fs.writeFile(libraryData, jsonString, 'utf8', function (err) {
        if (err) throw err;
        console.log('Database updated.')
      });
    /*
    for (let book of books) {
        if (book.itemName==filePath) {
            delete books.book
            var jsonString= JSON.stringify(books);
            console.log(books)
            fs.writeFile(libraryData, jsonString, 'utf8', function (err) {
              if (err) throw err;
              console.log('Database updated.')
            });
        }
    }
    */


}

module.exports = { deleteBook };
