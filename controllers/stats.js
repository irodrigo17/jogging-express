var Jog = require('../models/jog');
var Stats = require("../models/stats");

module.exports.stats = function(req, res, next){

  // check parameters
  var userId = req.user._id;
  if(!userId){
    return res.status(401).end();
  }

  // get jogs
  var query = Jog.find().where('userId').equals(userId);
  query.sort('+date');
  query.exec(function(err, jogs){
    if(err){
      return next(err);
    }
    var stats = Stats.createStats(jogs)
    res.json(stats);
  });
};
