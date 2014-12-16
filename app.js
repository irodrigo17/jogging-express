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

var userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

app.use(function(req, res, next) {
  // catch 404 and forward to error handler
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// setup error handlers
if (app.get('env') === 'development') {
  // development error handler
  // will print stacktrace
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      error: err
    });
  });
}
else{
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      error: err.message
    });
  });
}

module.exports = app;
