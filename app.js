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

// TODO: DRY /api prefix

var userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

var jogRoutes = require('./routes/jogs');
app.use('/api/jogs', jogRoutes);


// setup passport
// TODO: move this stuff to it's own file
var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('./models/user');

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log(username + ' is attemping to sign in');
    User.findOne({username: username}, function (err, user) {
      if (err) { 
        console.log('error finding ' + username + ' in the db');
        return done(err); 
      }
      if (!user) {
        console.log(username + ' is not in the db');
        return done(null, false, { 
          message: 'Incorrect username.' 
        });
      }
      console.log('user: ' + user);
      console.log('stored password: ' + user.password);
      if (!user.validPassword(password)) {
        console.log(username + ' passwords don\'t match');
        return done(null, false, { 
          message: 'Incorrect password.' 
        });
      }
      console.log(username + ' should sign in');
      user.password = null;
      return done(null, user);
    });
  }
));

app.use(passport.initialize());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
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
