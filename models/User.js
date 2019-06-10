const mongoose = require('mongoose');
const {Schema} = mongoose;

// this is where you add additional fields to hold user records in mongoDB
const userSchema = new Schema({
  googleId: String,
  credits: {type: Number, default: 0}
});

// (1)         (2)        (3)
mongoose.model('users', userSchema);

// (1) statement that loads the schema into tne mongoose library
// (2) name of the model class
// (3) name of the schema

// this file needs to be required in index.js