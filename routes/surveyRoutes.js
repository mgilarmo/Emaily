const _ = require('lodash');
const {Path} = require('path-parser');
const {URL} = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys') // added to side-step issues if/when running tests

module.exports = (app) => {
  app.get(
    '/api/surveys',
    requireLogin,
    async (req, res) => {
      const surveys = await Survey.find({_user: req.user.id})
        .select({recipients: false});
      res.send(surveys);
    }
  )

  app.get(
    '/api/surveys/:surveyId/:choice/responded', 
    (req, res) => {
      res.send('Thanks for responding!');
    }
  );

  app.post(
    '/api/surveys/webhooks', 
    (req, res) => {
      const p = new Path('/api/surveys/:surveyId/:choice')
      _.chain(req.body)
        .map(({email, url}) => {
          const match = p.test(new URL(url).pathname);
          if (match) {
            return {email, surveyId: match.surveyId, choice: match.choice};
          }
        })
        .compact()
        .uniqBy('email', 'surveyId')
        .each(({surveyId, email, choice}) => {
          Survey.updateOne({
            _id: surveyId,
            recipients: {
              $elemMatch: {email: email, responded: false}
            }
          }, {
            $inc: {[choice]: 1},
            $set: {'recipients.$.responded': true},
            lastResponded: new Date()
          }).exec();
        })
        .value();
      res.send({});
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