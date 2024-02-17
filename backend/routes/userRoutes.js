const express = require('express');
const router = express.Router();
const keys = require('../config/keys.js');

const loginSuccess = "http://localhost:3000/login/success"
const loginError = "http://localhost:3000/login/error"

const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: keys.auth0.secret,
  baseURL: 'http://localhost:3000',
  clientID: 'MLUc1mDRS9b3aL0KgkLZhYA8fFglGjID',
  issuerBaseURL: 'https://dev-uqqt354ibszasep8.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
router.use(auth(config));

// req.isAuthenticated is provided from the auth router
router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

module.exports = router;
