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

var http = require('http').Server(app);
var io = require('socket.io')(http);

//Whenever someone connects this gets executed
io.on('connection', function(socket){
  console.log('A user connected');
  socket.send('Sent a message 4seconds after connection!');

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
     socket.send('Sent a message 4seconds after connection!');
  });
});

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

http.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
