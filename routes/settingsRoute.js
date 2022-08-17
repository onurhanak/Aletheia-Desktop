
const express = require('express');
const router = express.Router();

var homePath = require('../services/setDownloadFolder')

// Home page route.
router.get('/', function (req, res) {
  res.render('../views/settings.ejs');
  homePath.setDownloadPath()
})

router.post('/', function(req,res){
    settings=req.body.mirrors
    res.render('settings');
})

module.exports = router;
