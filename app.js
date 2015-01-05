// setup express app
var express = require('express');
var app = express();

// setup logging
var logger = require('morgan');
app.use(logger('dev'));

// setup database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jogging-express', function(err) {
  if(err) {
    console.log('Database connection error', err);
    throw err;
  } else {
    console.log('Database connection OK');
  }
});

// setup JSON body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// setup routes
var indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

// setup auth
// TODO: move to it's own module
// TODO: hide secret
// TODO: add Facebook/Twitter auth
var jwt = require('express-jwt');
app.use(jwt({ secret: 'S3cr3t!'}).unless({path: ['/api/users/signup', '/api/users/signin']}));

// TODO: DRY /api prefix

var userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

var jogRoutes = require('./routes/jogs');
app.use('/api/jogs', jogRoutes);

var statsRoutes = require('./routes/stats');
app.use('/api/stats', statsRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// setup error handlers
// TODO: improve error handling
if (app.get('env') === 'development') {
  // development error handler
  // will print stacktrace
  app.use(function(err, req, res, next) {
    console.error(err)
    res.status(err.status || 500);
    res.json({
      error: err.message,
      stacktrace: err.stack
    });
  });
}
else{
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    console.error(err)
    res.status(err.status || 500);
    res.json({
      error: err.message
    });
  });
}

// TODO: use SSL
// TODO: add tests
// TODO: document endpoints

module.exports = app;
