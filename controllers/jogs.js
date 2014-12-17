var Jog = require('../models/jog');

module.exports = {
	
  // create a jog
  create: function(req, res, next){

    var jog = new Jog(req.body);

    jog.save(function(err, jog){
      if(err){
        return next(err);
      }

      Jog.findById(jog._id, function(err, jog){
        if(err){
          return next(err);
        }
        res.json(jog);
      });
    });

  },

  // list all jogs
  list: function(req, res, next){
    Jog.find(function(err, jogs){
      if(err){
        return next(err);
      }

      res.json(jogs);
    });
    
  },

  // show a jog
  show: function(req, res, next){
    Jog.findById(req.params.jogId, function(err, jog){
      if(err){
        return next(err);
      }
      
      if(jog == null){
        res.status(404).end();
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

      if(jog == null){
        res.status(404).end();
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