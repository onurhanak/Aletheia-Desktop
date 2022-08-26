
const express = require('express');
const router = express.Router();
var homePath = require('../services/setDownloadFolder')


// Home page route.
router.get('/', function (req, res) {
  res.render('../views/index.ejs');
  homePath.setDownloadPath()
})

router.post('/', function(req,res){
  var message = req.body.message
})


module.exports = router;
