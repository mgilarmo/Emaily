const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Survey = mongoose.model('surveys') // added to side-step issues if/when running tests

module.exports = (app) => {
  app.post( // args should be added in the order they should be evaluated
    '/api/surveys',
    requireLogin,
    requireCredits,
    (req, res) => {
      const {title, subject, body, recipients} = req.body;
      const survey = new Survey({  // const survey is lowercase to indicate its an instance of the Survey Model
        title, // es6 syntax to convert from 'title: title'
        subject, 
        body,
        recipients: recipients.split(',').map(email => {return {}})

      })
    }
  );
};