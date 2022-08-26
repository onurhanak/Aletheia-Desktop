
const express = require('express');
const router = express.Router();

var homePath = require('../services/setDownloadFolder')
var pathDownload = homePath.downloadPath
var downloadBook = require('../services/downloadBook')
var saveBook = require('../services/saveToDatabase')


router.post('/', async function(req,res){
    bookName=req.body.bookname
    filename=req.body.filename
    dl=req.body.dl
    filesize=req.body.filesize
    author=req.body.author
    coverLink=req.body.coverlink
    console.log(bookName,filesize,author,coverLink,filename)
    downloadBook.download(filename,dl,pathDownload)
    saveBook.save(bookName,filesize,author,coverLink,filename)
})

module.exports = router;
  