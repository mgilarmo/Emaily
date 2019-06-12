const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys') // added to side-step issues if/when running tests

module.exports = (app) => {
  app.get(
    '/api/surveys/responded', 
    (req, res) => {
      res.send('Thanks for responding!');
    }
  );

  app.post( 
    // args should be added in the order they should be evaluated
    '/api/surveys',
    requireLogin,
    requireCredits,
    async (req, res) => {
      const {title, subject, body, recipients} = req.body;
      const survey = new Survey({  // const "survey" is lowercase to indicate its an instance of the Survey Model
        title, // es6 syntax to convert from 'title: title'
        subject, 
        body,
        recipients: recipients.split(',').map(email => ({email: email.trim()})),
        _user: req.user.id,
        dateSent: Date.now()
      });

      const mailer = new Mailer(survey, surveyTemplate(survey));
      try {
        await mailer.send();
        await survey.save();
        req.user.credits -= 1;
        const user = await req.user.save();
        res.send(user);
      } catch (err) {
        res.status(422).send(err);
      }
    }
  );
};