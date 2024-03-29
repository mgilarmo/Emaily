const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
  app.post(
    // args should be added in the order they should be evaluated
    '/api/stripe', 
    requireLogin,
    async (req, res) => {
      const charge = await stripe.charges.create({
        amount: 500,
        currency: 'usd',
        description: '$5.00 for 5 Credits',
        source: req.body.id
      })
      req.user.credits += 5;
      const user = await req.user.save();

      res.send(user);
    }
  );
};