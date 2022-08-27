const express = require("express");
const router = express.Router();

var deleteBook = require("../services/deleteBook");

router.post("/", async function (req, res) {
  var filePath = req.body.filePath;
  deleteBook.deleteBook(filePath);
});

module.exports = router;
