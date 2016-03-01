var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db/database');
var passport = require('passport');
var session = require('express-session');
var GitHubStrategy = require('passport-github2').Strategy;



var GITHUB_CLIENT_ID = '658fea61e03af746bc5d';
var GITHUB_CLIENT_SECRET = 'bde548d3cba62df8b2cbbb9fd184c6bb7b667ab3';

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's GitHub profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the GitHub account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));


var app = express();

var Issues = require('./models/issues');
Issues = new Issues();

var Repos = require('./models/repos');
Repos = new Repos();

app.use(bodyParser.json());

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/../client'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

var port = process.env.PORT || 3000;

app.route('/api')
  .get(function(req, res){
    console.log('/api', req);
    res.send('Hello World');
  });

app.route('/api/issues')
  .get(function(req, res) {
    Issues.getIssues()
    .then((results) => res.send(results))
    .catch((err) => {
      console.log(err);
      res.statusCode = 501;
      res.send('Unknown Server Error');
    });
  });

app.route('/api/repos')
  .get(function(req, res){
    Repos.getRepos()
    .then((results) => res.send(results))
    .catch(() => {
      res.statusCode = 501;
      res.send('Unknown Server Error');
    });
  });

  // GET /auth/github
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  The first step in GitHub authentication will involve redirecting
  //   the user to github.com.  After authorization, GitHub will redirect the user
  //   back to this application at /auth/github/callback
  app.route('/auth/github').get(function(req, res) {
    passport.authenticate('github', { scope: [ 'user' ] }),
    function(req, res){
      // The request will be redirected to GitHub for authentication, so this
      // function will not be called.
    };
  })


  // GET /auth/github/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function will be called,
  //   which, in this example, will redirect the user to the home page.
  app.route('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    });

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

console.log(`server running on port ${port} in ${process.env.NODE_ENV} mode`);
// start listening to requests on port 3000
app.listen(port);

// export our app for testing and flexibility, required by index.js
module.exports = app;
