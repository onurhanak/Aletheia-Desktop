
const express = require('express');
const router = express.Router();


// search function
var search = require('../services/searchLibgen')
var settings = require('../services/saveSettings')
router.post('/', function(req,res){
    query= req.body.query
    column = req.body.column
    res.redirect('search'+'/?query='+query+'&column='+column); 
})
  
router.get("/", function (req, res) {
    var settingsData = settings.readSettings()
    var theme = settingsData[0]
    var mirror = settingsData[1]
    var query = req.query.query
    var column = req.query.column
    if (query!=undefined){
      search.searchLibgen(query,mirror,column).then(function (results) {
        res.render("search", {books:results});
      })
    } else {
      res.render("index")
    }
  });

module.exports = router;




  
  
