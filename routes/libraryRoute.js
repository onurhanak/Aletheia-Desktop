const express = require("express");
const router = express.Router();

var readLibrary = require("../services/readLibraryDatabase.js");
var defaultOpen = require("../services/defaultOpen");
const { exec } = require("child_process");
const open = require("open");

router.get("/", async function (req, res) {
  var openCommand = await defaultOpen.getOpenCommand();
  readLibrary.readDatabase().then(function (results) {
    res.render("library", { books: results, open: openCommand });
  });
});

router.post("/", async function (req, res) {
  filePath = req.body.filePath;
  open(filePath);
});

module.exports = router;
