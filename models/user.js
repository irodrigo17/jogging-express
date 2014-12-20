var mongoose = require('mongoose');

// custom setters
function hash (val){
  // TODO: hash and salt me please
  return val != null ? "HASHED!" : null;
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
  // TODO: check hashed password properly
  console.log('validating password ' + password + ' against ' + this.password);
  return (this.password === password);
};

// export user model
module.exports = mongoose.model('User', schema);
