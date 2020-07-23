const User = require('../models/Customer');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt'); // !!!
const passport = require('passport');
const GoogleStrategy = require('passport-google').Strategy;

passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
  User.findById(userIdFromSession, (err, userDocument) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, userDocument);
  });
});

passport.use(new GoogleStrategy({
    returnURL: 'http://localhost:5555/auth/google/return',
    realm: 'http://localhost:5555/'
  },
  function(identifier, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
        User.findOne({ googleId: profile.id })
        .then((found) => {
          if (found !== null) {
            // user with that githubId already exists
            done(null, found);
            res.json(found);
          } else {
            // no user with that githubId
            return User.create({
              googleId: profile.id,
              firstName: profile.name,
              email: profile.email,
            }).then((dbUser) => {
              done(null, dbUser);
              res.json(dbUser);
            });
          }
        })
        .catch((err) => {
          done(err);
        });
    });
  }
));


passport.use(
  new LocalStrategy((email, password, next) => {
    User.findOne({ email }, (err, foundUser) => {
      if (err) {
        next(err);
        return;
      }

      if (!foundUser) {
        next(null, false, { message: 'Incorrect credentials' });
        return;
      }

      if (!bcrypt.compareSync(password, foundUser.password)) {
        next(null, false, { message: 'Incorrect credentials' });
        return;
      }

      next(null, foundUser);
    });
  })
);