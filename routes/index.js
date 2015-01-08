var express = require('express');

// TODO: remove this endpoint
var router = express.Router();
router.get('/', function(req, res) {
  res.json({
  	status: "API is up and running!"
  });
});

module.exports = router;
