var express = require('express');
var usersController = require('../controllers/users');

var router = express.Router();
router.post('/signup', usersController.signUp);
router.post('/signin', usersController.signIn);
router.post('/signout', usersController.signOut);
router.get('/:userId', usersController.show);
router.patch('/:userId', usersController.update);

module.exports = router;
