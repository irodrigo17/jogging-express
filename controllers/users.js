var User = require('../models/user');
var jwt = require('jsonwebtoken');

module.exports = {

  signUp: function(req, res, next){

    var user = new User(req.body);

    user.save(function(err, savedUser){
      if(err){
        // check for unique index errors
        if(err.code === 11000 || err.code === 11001) {
          var uniquePaths = ['username', 'email'];
          for(var i = 0; i < uniquePaths.length; i++){
            var path = uniquePaths[i];
            if(err.message.indexOf(path) != -1){
              var error = new Error();
              error.status = 400;
              error.message = path + ' ' + user.get(path) + ' already taken';
            }
          }
        }
        else if(err.name == 'ValidationError'){
          err.status = 400;
        }
        return next(err);
      }

      User.findById(savedUser._id, function(err, fetchedUser){
        if(err){
          return next(err);
        }
        // TODO: remove password from JSON
        // TODO: sign in?
        res.json(fetchedUser);
      });
    });

  },

  signIn: function(req, res, next){

    User.findOne({username: req.body.username}, function(err, user){
      if(err){
        return next(err);
      }
      if(!user || !user.validPassword(req.body.password)){
        res.status(401).end();
        // TODO: add error message?
      }
      else{
        var token = jwt.sign({
          username: user.username,
          _id: user._id
        }, 'S3cr3t!');
        // TODO: hide secret
        // TODO: DRY secret
        // TODO: expire tokens
        // TODO: remove user password
        // TODO: store token for later verification
        res.json({
          user: user,
          token: token
        });
      }
    });
  },

  show: function(req, res, next){
    if(!req.user._id){
      res.status(401).end();
    }
    else if(req.user._id != req.params.userId){
      res.status(403).end();
    }
    else{
      User.findById(req.params.userId, function(err, user){
        if(err){
          return next(err);
        }
        if(user == null){
          res.status(404).end();
        }
        else{
          res.json(user);
        }
      });
    }
  },

	update: function(req, res, next){

		// TODO: update in one step?
		User.findById(req.params.userId, function(err, user){
			if(err){
				return next(err);
			}
			else if(user == null){
				res.status(404).end();
			}
			else if(req.params.userId != req.user._id){
				res.status(403).end();
			}
			else{
				if(req.body.name){
					user.name = req.body.name;
				}
				user.save(function(err, user){
					if(err){
						return next(err);
					}
					res.json(user);
				});
			}
		});
	},

  remove: function(req, res, next){

    // TODO: remove in one step?
    User.findById(req.params.userId, function(err, user){
      if(err){
        return next(err);
      }
      else if(user == null){
        res.status(404).end();
      }
      else if(req.params.userId != req.user._id){
        res.status(403).end();
      }
      else{
        // TODO: invalidate token
        user.remove(function(err){
          if(err){
            return next(err);
          }
          res.status(204).end();
        });
      }
    });
  },
};
