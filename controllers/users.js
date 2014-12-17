var User = require('../models/user');

module.exports = {
	
  // sign up
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
              return next(error);
            }
          }
        }
        return next(err);
      }

      User.findById(savedUser._id, function(err, fetchedUser){
        if(err){
          return next(err);
        }
        res.json(fetchedUser);
      });
    });

  },

  // sign in
  signIn: function(req, res, next){
    // TODO: create a token for the given user
    res.json({
      message: "Sign in is not implemented yet"
    })
  },

  // sign out
  signOut: function(req, res, next){
    // TODO: destroy the token for the given user
    res.json({
      message: "Sign out is not implemented yet"
    })
  },

  // shows an user
  show: function(req, res, next){
    User.findById(req.params.userId, function(err, user){
      if(err){
        if(err.name == 'CastError' && err.type == 'ObjectId'){
          res.send(404);
        }
        else{
          return next(err);  
        }
        
      }
      if(user == null){
        res.send(404);
      }
      else{
        res.json(user);
      }
    });
  },

};