var express = require('express');

var router = express.Router();
router.get('/', function(req, res) {
  res.json({
  	status: "API is up and running!"
  });
});

module.exports = router;
