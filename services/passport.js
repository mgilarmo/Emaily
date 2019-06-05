const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClentSecret,
      callbackURL: '/auth/google/callback'
    }, 
    (accessToken, refreshToken, profile, done) => {
      // anytime we reach out to database, we initiate an async action
      // using a promise looks like this:
      User.findOne({googleId: profile.id}).then((existingUser) => {
        if(existingUser) {
          done(null, existingUser);
        } else {
          // calling "new User()" creates a new mongoose "Model Instance" representing a single record inside our collection
          new User({googleId: profile.id, displayName: profile.displayName})
            .save()
            // the ".then" creates *another* "Model Instance"
            .then(user => done(null, user));
        }
      })
    }
  )
);