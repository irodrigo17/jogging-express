var express = require('express');
var router = express.Router();

// Get API status
router.get('/', function(req, res) {
  res.json({
  	status: "API is up and running!"
  });
});

module.exports = router;
