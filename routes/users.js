var express = require('express');
var router = express.Router();

var usersController = require('../controllers/users');

// Sign up
router.post('/signup', usersController.signUp);

// Sign in
router.post('/signin', usersController.signIn);

// Sign out
router.post('/signout', usersController.signOut);

// Show an user
router.get('/:userId', usersController.show);

module.exports = router;
