const mongoose = require('mongoose');
const {Schema} = mongoose;


// this is where you add additional fields to hold user records 
const userSchema = new Schema({
  googleId: String
})

mongoose.model('users', userSchema);