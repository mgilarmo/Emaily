const mongoose = require('mongoose');
const {Schema} = mongoose;
const RecipientSchema = require('./Recipient')

// this is where you add additional fields to hold user records in mongoDB
const surveySchema = new Schema({
  title: String,  // email campaign title
  subject: String,
  body: String,
  recipients: [RecipientSchema], // an array containing a list of RecipientSchema Records
  yes: {type: Number, default: 0},
  no: {type: Number, default: 0},

  //(1)         (2)                    (3)
  _user: {type: Schema.Types.ObjectId, ref: 'User'},  // identifies the user to which the survey belongs
  // (1) the underscore is optional, but its convention to make it obvious there is a relationship between this model and another one
  // (2) looks up the id of model specified in the next arg to associate it with this survey
  // (3) specifies that the Schema.Types.ObjectId argument should be pulling the id from the User Model, tieing the survey to the user

  dateSent: Date,  // date the survey was sent out
  lastResponded: Date  // the last time a response was received for that survey
});

// (1)         (2)        (3)
mongoose.model('surveys', surveySchema)
// (1) statement that loads the schema/collection into tne mongoose library
// (2) name of the model class/collection
// (3) name of the schema

// this file needs to be required in index.js