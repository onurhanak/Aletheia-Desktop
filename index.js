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

const deletePage = require('./routes/deleteRoute.js');
app.use('/delete', deletePage);

const searchPage = require('./routes/searchRoute.js');
app.use('/search', searchPage);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
