var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

// custom setters
function hash (val){
  return bcrypt.hashSync(val, 10);
}

// define basic user schema
var schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
    // TODO: add email validation
    // TODO: add email verification
  },
  password: {
    type: String,
    required: true,
    set: hash
    // TODO: set select: false, and select password manually only in the needed queries
  }
});

// custom methods
schema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

// export user model
module.exports = mongoose.model('User', schema);
