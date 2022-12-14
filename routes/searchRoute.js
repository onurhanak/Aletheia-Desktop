const express = require("express");
const router = express.Router();

// search function
var search = require("../services/searchLibgen");
var settings = require("../services/saveSettings");

router.post("/", function (req, res) {
  query = req.body.query;
  column = req.body.column;
  res.redirect(`search/?query=${query}&column=${column}`);
});

router.get("/", function (req, res) {
  var settingsData = settings.readSettings();
  var theme = settingsData[0];
  var mirror = settingsData[1];
  var query = req.query.query;
  var column = req.query.column;
  var page = "1" //default
  if (query != undefined) {
    try {
      search.searchLibgen(query, mirror, column, page).then(function (results) {
        if (results != "No results") {
          res.render("../views/search.ejs", { books: results });
        } else {
          res.render("../views/noResults.ejs");
        }
      });
    } catch {
      res.render("index");
    }
  } else {
    res.render("index");
  }
});

module.exports = router;
