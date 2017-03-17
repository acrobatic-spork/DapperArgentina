var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db/database');
var passport = require('passport');
var session = require('express-session');
var GitHubStrategy = require('passport-github2').Strategy;
var methodOverride = require('method-override');
var config = require('../config');
var Util = require('./data-processor/util');
var ForkUtil = require('./models/forks');
var UserUtil = require('./models/users');
var FriendUtil = require('./models/friends');
var path = require('path');
var https = require('https');
var fs = require('fs');


var User = db.User;
var UserIssues = db.UserIssues;
var UserForks = db.UserForks;

var GITHUB_CLIENT_ID = config.githubClientId;
var GITHUB_CLIENT_SECRET = config.githubSecret;

var AUTH_SECRET = config.authSecret;

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
passport.use(new GitHubStrategy(
  {
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: config.authCallbackUrl
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      User.findOrCreate({where: {id: profile.id}})
      .spread(function(user, created) {
        user.update({
          username: profile._json.login,
          name: profile._json.name,
          html_url: profile._json.html_url,
          repos_url: profile._json.repos_url,
          avatar_url: profile._json.avatar_url,
          access_token: accessToken,
          refresh_token: refreshToken
        }).then(function(user) {
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
app.use(session({ secret: AUTH_SECRET, resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());



var distDir = path.resolve(__dirname, '../client');
app.use(express.static(distDir));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

var port = process.env.PORT || 3000;

app.get('/api/events/:username', function(req, res) {
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

app.get('/api/users/issues/:user_id', function(req, res) {
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


app.get('/api/issues', function(req, res) {
  Issues.getIssues()
  .then((results) => res.send(results))
  .catch((err) => {
    console.log(err);
    res.statusCode = 501;
    res.send('Unknown Server Error');
  });
});

app.get('/api/repos', function(req, res) {
  Repos.getRepos()
  .then((results) => res.send(results))
  .catch(() => {
    res.statusCode = 501;
    res.send('Unknown Server Error');
  });
});

app.get('/api/fork', ForkUtil.forkRepo);

app.delete('/api/fork', ForkUtil.deleteFork);

app.get('/api/user/forks', function (req, res) {
  ForkUtil.getForkedRepos(req.query.username)
  .then(function (results) {
    var forkedParentUrlsId = results.map(function (forkObj) {
      return [forkObj.parent_url, forkObj.parent_repo_id];
    });
    Util.getPullRequests(req.query.username, forkedParentUrlsId, function(response) {
      res.json(response);
    });
  });
});

app.get('/api/users', UserUtil.getUsers);
app.post('/api/friend', FriendUtil.addFriend);
app.get('/api/friend', FriendUtil.getFriends);
app.delete('/api/friend', FriendUtil.deleteFriend);

app.get('/auth/github', 
  passport.authenticate('github', {scope: ['user', 'repo']}));


app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.cookie('userid', req.user.dataValues.id, { maxAge: 2592000000 });
    res.redirect('/');
  });

app.get('/logout', function(req, res) {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

app.use(function(req, res, next) {
  if (req.accepts('html') && req.method === 'GET') {
    console.log('in fallback. req is ' + JSON.stringify(req.accepts('html')));
    res.sendFile(path.join(distDir, '/index.html'));
  } else {
    next();
  }
});

console.log(`server running on port ${port} in ${process.env.NODE_ENV} mode`);
// start listening to requests on port 3000
app.listen(port);

if (process.env.NODE_ENV === 'production') {
  var httpsOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/sporkhub.xyz/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/sporkhub.xyz/fullchain.pem'),
    ca: fs.readFileSync('/etc/letsencrypt/live/sporkhub.xyz/chain.pem')
  };
  https.createServer(httpsOptions, app).listen(443);
}


// export our app for testing and flexibility, required by index.js
module.exports = app;
