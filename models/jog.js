var mongoose = require('mongoose');

// define basic jog schema
var schema = new mongoose.Schema({
  time: {
    type: Number,
    required: true,
    min: 0
  },
  distance: {
    type: Number,
    required: true,
    min: 0
  },
  date: {
    type: Date,
    required: true,
    index: true
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'UserSchema',
    required: true,
    index: true
    // TODO: check if the user actually exists
  }
});

// export user model
module.exports = mongoose.model('Jog', schema);
