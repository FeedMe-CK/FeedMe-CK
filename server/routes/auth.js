const express = require('express');
const router = express.Router();
const User = require('../models/Customer');
const bcrypt = require('bcrypt');
const passport = require('passport');

router.post('/signup', (req, res) => {
  const { fristname,lastname,email, password, address,placeId} = req.body;

  if (!password || password.length < 8) {
    return res
      .status(400)
      .json({ message: 'Your password must be 8 char. min.' });
  }
  if (!email) {
    return res.status(400).json({ message: 'Your email cannot be empty' });
  }
  if (!fristname) {
    return res.status(400).json({ message: 'Your firstname cannot be empty' });
  }
  if (!lastname) {
    return res.status(400).json({ message: 'Your lastname cannot be empty' });
  }
  if (!address) {
    return res.status(400).json({ message: 'Your address cannot be empty' });
  }
  


  User.findOne({ email: email })
    .then(found => {
      if (found) {
        return res
          .status(400)
          .json({ message: 'This email is already taken' });
      }

      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(password, salt);

      return User.create({ email: email, password: hash , address,fristname,lastname }).then(
        dbUser => {

          req.login(dbUser, err => {
            if (err) {
              return res
                .status(500)
                .json({ message: 'Error while attempting to login' });
            }
            res.json(dbUser);
          });
        }
      );
    })
    .catch(err => {
      res.json(err);
    });
});

router.post('/login', (req, res) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Error while authenticating' });
    }
    if (!user) {
      return res.status(400).json({ message: 'Wrong credentials' });
    }
    req.login(user, err => {
      if (err) {
        return res
          .status(500)
          .json({ message: 'Error while attempting to login' });
      }
      return res.json(user);
    });
  })(req, res);
});

router.get('/api/auth/google',
  passport.authenticate('google', { 
    scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
    ] }
));

router.get( '/api/auth/google/callback', 
    passport.authenticate( 'google', { 
        successRedirect: 'http://localhost:3000',
        failureRedirect: '/login'
}));

router.delete('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Successful logout' });
})

router.get('/loggedin', (req, res) => {
    console.log(logged)
  res.json(req.user);
})

module.exports = router;