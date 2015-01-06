var express = require('express');
var statsController = require('../controllers/stats');

var router = express.Router();
router.get('/', statsController.stats);

module.exports = router;
