
const express = require('express');
const router = express.Router();

// search function
var search = require('../services/searchLibgen')

router.post('/', function(req,res){
    res.redirect('search'+'/?query='+req.body.query); 
})
  
router.get("/", function (req, res) {
    var query = req.query.query
    if (query!=undefined){
      search.searchLibgen(query).then(function (results) {
        res.render("search", {books:results});
      })
    } else {
      res.render("index")
    }
  });

module.exports = router;




  
  
