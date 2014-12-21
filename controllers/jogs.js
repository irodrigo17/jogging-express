var Jog = require('../models/jog');

module.exports = {
	
  // create a jog
  create: function(req, res, next){

    var jog = new Jog(req.body);
    jog.userId = req.user._id;

    jog.save(function(err, jog){
      if(err){
        return next(err);
      }

      res.json(jog);
    });
  },

  // list all jogs
  list: function(req, res, next){
    // TODO: add pagination
    Jog.find({userId: req.user._id}, function(err, jogs){
      if(err){
        return next(err);
      }

      res.json(jogs);
    });
    
  },

  // get a particular jog
  show: function(req, res, next){
    Jog.findById(req.params.jogId, function(err, jog){
      if(err){
        return next(err);
      }
      else if(jog == null){
        res.status(404).end();
      }
      else if(jog.userId != req.user._id){
        res.status(403).end();
      }
      else{
        res.json(jog);
      }
    });
  },

  // removes a jog
  remove: function(req, res, next){

    // TODO: remove in one step?
    Jog.findById(req.params.jogId, function(err, jog){
      if(err){
        return next(err);
      }
      else if(jog == null){
        res.status(404).end();
      }
      else if(jog.userId != req.user._id){
        res.status(403).end();
      }
      else{
        jog.remove(function(err){
          if(err){
           return next(err);
          }
          res.status(204).end();
        });
      }
    });
  },

};