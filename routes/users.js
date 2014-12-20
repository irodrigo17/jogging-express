var express = require('express');
var router = express.Router();

var usersController = require('../controllers/users');

// Sign up
router.post('/signup', usersController.signUp);

// Sign in
var passport = require('passport');
router.post('/signin', passport.authenticate('local'), function(req, res, next){
	console.log(user.username + ' signed in');
  res.json({ 
    user: req.user
  });
});

// Sign out
router.post('/signout', usersController.signOut);

// Show an user
router.get('/:userId', usersController.show);

module.exports = router;
