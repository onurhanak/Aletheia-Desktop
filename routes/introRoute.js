const express = require("express");
const router = express.Router();

// Home page route.
router.get("/", function (req, res) {
  res.render("../views/intro.ejs");
});

module.exports = router;
