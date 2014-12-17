var express = require('express');
var router = express.Router();

var jogsController = require('../controllers/jogs');

// Create
router.post('/', jogsController.create);

// List
router.get('/', jogsController.list);

// Show
router.get('/:jogId', jogsController.show);

// Delete
router.delete('/:jogId', jogsController.remove);

module.exports = router;
