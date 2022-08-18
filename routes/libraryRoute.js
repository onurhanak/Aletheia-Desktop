
const express = require('express');
const router = express.Router();

var readLibrary = require('../services/readLibraryDatabase.js')


router.get("/", function (req, res) {
      readLibrary.readDatabase().then(function (results) {
        res.render("library", {books:results});
      })
  });

module.exports = router;