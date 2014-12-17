var mongoose = require('mongoose');

// custom setters
function hash (val){
  return "HASHED!";
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
    select: false,
    set: hash
  }
});

// export user model
module.exports = mongoose.model('User', schema);
