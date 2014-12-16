var User = require('../models/user');

module.exports = {
	
  // sign up
  signUp: function(req, res){

    User.create(req.body, function(err, user){
      if(err){
        return next(err);
      }
      
      res.json(user);

    });
    
  },

  // sign in
  signIn: function(req, res){
    // TODO: create a token for the given user
    res.json({
      message: "Sign in is not implemented yet"
    })
  },

  // sign out
  signOut: function(req, res){
    // TODO: destroy the token for the given user
    res.json({
      message: "Sign out is not implemented yet"
    })
  },

};