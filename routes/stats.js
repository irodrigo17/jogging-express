var express = require('express');
var router = express.Router();

var statsController = require('../controllers/stats');

router.get('/', statsController.stats);

module.exports = router;
