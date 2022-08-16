const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors');
const app = express()
const port = 3002
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(cors());
app.options('*', cors());
// search function
var search = require('./services/searchLibgen')
var homePath = require('./services/setDownloadFolder')


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('index');
});

app.get('/settings', function(req, res){
  res.render('settings');
  console.log(homePath)
});

app.post('/settings', function(req,res){
  settings=req.body.query
  console.log(settings)
  res.render('settings');
})

app.post('/search', function(req,res){
  res.redirect('search'+'/?query='+req.body.query); 
})



app.get("/search", function (req, res) {
  var query = req.query.query
  if (query!=undefined){
    search.searchLibgen(query).then(function (results) {
      res.render("search", {books:results});
    })
  } else {
    res.render("index")
  }

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
