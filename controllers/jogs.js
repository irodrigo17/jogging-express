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

    // check parameters
    var userId = req.user._id;
    if(!userId){
      return res.status(401).end();
    }

    // create basic query
    var query = Jog.find().where('userId').equals(userId);

    // add date filtering
    var start = req.query.startDate;
    if(start){
      query.where('date').gte(start);
    }

    var end = req.query.endDate;
    if(end){
      query.where('date').lte(end);
    }

    // add pagination
    var limit = req.query.limit || 10;
    console.log('limit: ' + limit);
    query.limit(limit);

    var skip = req.query.skip || 0;
    console.log('skip: ' + skip);
    query.skip(skip);

    // add sorting
    query.sort('-date');

		// execute query
    query.exec(function(err, jogs){
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
  update: function(req, res, next){

    // TODO: update in one step
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
        if(req.body.time){
          jog.time = req.body.time;
        }
        if(req.body.distance){
          jog.distance = req.body.distance;
        }
        if(req.body.date){
          jog.date = req.body.date;
        }
        jog.save(function(err, jog){
          if(err){
            return next(err);
          }
          res.json(jog);
        });
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
