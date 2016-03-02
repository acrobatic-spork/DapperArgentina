var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db/database');
var passport = require('passport');
var session = require('express-session');
var GitHubStrategy = require('passport-github2').Strategy;
var methodOverride = require('method-override');
var config = require('./config');
var Util = require('./data-processor/util');

var User = db.User;
var UserIssues = db.UserIssues;

var GITHUB_CLIENT_ID = config.githubClientId;
var GITHUB_CLIENT_SECRET = config.githubSecret;

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
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      User.findOrCreate({where: {id: profile.id}, 
        defaults: {spork_1: 0, spork_2: 0,spork_3: 0}
      })
      .spread(function(user, created) {
        user.update({
          username: profile._json.login,
          name: profile._json.name,
          html_url: profile._json.html_url,
          repos_url: profile._json.repos_url,
          avatar_url: profile._json.avatar_url
        }).then(function(user){
          console.log('updated user: ', JSON.stringify(user));
          return done(null, user);
        }).catch(function(error) {
          console.error('error updating user: ', error);
          return done(error, null);
        });
      });
      
      // return done(null, profile);
    });
  }
));


var app = express();

var Issues = require('./models/issues');
Issues = new Issues();

var Repos = require('./models/repos');
Repos = new Repos();

app.use(bodyParser.json());

app.use(methodOverride());
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
    // console.log('/api', req);
    res.send('Hello World');
  });

app.route('/api/events/:username')
  .get(function(req, res) {
    Util.getUserGitHubEvents(req.params.username)
    .then((events) => {
      res.json(events);
    })
    .catch((err) => {
      console.log(err);
      res.statusCode = 501;
      res.send('Error Getting GitHub Events');
    });
  });

app.get('/api/users/:user_id', function(req, res) {
    User.findById(req.params.user_id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
      res.statusCode = 501;
      res.send('Unknown Server Error');
    });
  });

app.route('/api/users/issues/:user_id')
  .get(function(req, res) {
    UserIssues.findAll({
      where: {
        user_id: req.params.user_id
      }
    })
    .then((issues) => {
      res.json(issues);
    })
    .catch((err) => {
      console.log(err);
      res.statusCode = 501;
      res.send('Unknown Server Error');
    });
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
  app.get('/auth/github', 
    passport.authenticate('github', {scope: ['user', 'repo']}))


  // GET /auth/github/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function will be called,
  //   which, in this example, will redirect the user to the home page.
  app.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
      console.log('github callback : req..', req)
      res.cookie('userid', req.user.dataValues.id, { maxAge: 2592000000 });
      res.redirect('/');
    });

  app.get('/logout', function(req, res){
    req.logout();
    res.clearCookie();
    res.redirect('/');
  });

console.log(`server running on port ${port} in ${process.env.NODE_ENV} mode`);
// start listening to requests on port 3000
app.listen(port);

// export our app for testing and flexibility, required by index.js
module.exports = app;
