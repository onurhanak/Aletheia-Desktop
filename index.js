const express = require('express')
const app = express()
const port = 3002

const bodyParser = require('body-parser')
const cors = require('cors');
app.options('*', cors());

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(bodyParser.text());
app.use(cors());

const libraryPage = require('./routes/libraryRoute.js')
app.use('/library', libraryPage);

const settingsPage = require('./routes/settingsRoute.js')
app.use('/settings', settingsPage);

const indexPage = require('./routes/indexRoute.js');
app.use('/', indexPage);

const downloadPage = require('./routes/downloadRoute.js');
app.use('/download', downloadPage);

const searchPage = require('./routes/searchRoute.js');
app.use('/search', searchPage);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
