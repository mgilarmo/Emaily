const mongoose = require('mongoose');
const {Schema} = mongoose;

const recipientSchema = new Schema({
  email: String,
  responded: {type: Boolean, default: false}
});

module.exports = recipientSchema;

// this file needs to be required in Survey.js since it serves as a subdocument collection