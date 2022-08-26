
const express = require('express');
const router = express.Router();
var homePath = require('../services/setDownloadFolder')
var pathDownload = homePath.downloadPath
var downloadBook = require('../services/downloadBook')
var saveBook = require('../services/saveToDatabase')
var deleteBook = require('../services/deleteBook')

router.post('/', async function(req,res){
    var command = req.body.command;
    var filePath = req.body.filePath;
    deleteBook.deleteBook(filePath)
})

module.exports = router;
  