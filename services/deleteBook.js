const { exec } = require('child_process');
const { unlink } = require('node:fs')

function deleteBook(command,filePath) {
    console.log(filePath)
    unlink(filePath, (err) => {
        if (err) throw err;
        console.log('path/file.txt was deleted');
    })}

module.exports = { deleteBook };
