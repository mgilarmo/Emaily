const mongoose = require('mongoose');
const {Schema} = mongoose;


// this is where you add additional fields to hold user records 
const userSchema = new Schema({
  googleId: String,
  credits: {type: Number, default: 0}
});

mongoose.model('users', userSchema);