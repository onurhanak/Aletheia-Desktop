
const express = require('express');
const router = express.Router();

var homePath = require('../services/setDownloadFolder')
var settings = require('../services/saveSettings')

// Home page route.
router.get('/', function (req, res) {
  var settingsData = settings.readSettings()
  var theme = settingsData[0]
  var mirror = settingsData[1]
  res.render('../views/settings.ejs', {theme:theme, mirror:mirror, saved:'unsaved'});
  homePath.setDownloadPath()
})

router.post('/', function(req,res){
    mirror=req.body.mirrors
    theme=req.body.theme
    settings.setSettings(mirror,theme)
    res.render('settings', {saved:'saved'});
})

module.exports = router;
