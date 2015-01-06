var express = require('express');
var jogsController = require('../controllers/jogs');

var router = express.Router();
router.post('/', jogsController.create);
router.get('/', jogsController.list);
router.get('/:jogId', jogsController.show);
router.patch('/:jogId', jogsController.update);
router.delete('/:jogId', jogsController.remove);

module.exports = router;
