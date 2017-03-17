'use strict';

const request = require('request-promise');
const Promise = require('bluebird');
const db = require('../db/database');
const parseLink = require('parse-link-header');
const config = require('../../config');
var mergeObj = require('lodash.merge');
// var path = require('path');
var User = db.User;
var UserForks = db.UserForks;

/**Basic gitHub request information that we want to use in almost all API interactions */
var baseGithubOptions = {
  json: true, //parses the responses body to automatically be js obj
  resolveWithFullResponse: true, //provides full reponse and not just body (so we get headers)
  headers: { 'User-Agent': 'GitBegin App', 'Accept': 'application/json' },
  qs: {client_id: config.githubClientId,
  client_secret: config.githubSecret}
};

var forkRepo = function (req, res) {
   User.findOne({where: {username: req.query.username}})
  .then(function (user) {
    var options ={
        uri: 'https://api.github.com/repos/'+req.query.owner+'/'+req.query.repo+'/forks',
        headers: {
          'Authorization' : 'Token '+user.dataValues.access_token
        }
      }
    mergeObj(options, baseGithubOptions);  
    return request.post(options);
  })
  .then(function (res) {
    console.log("creating fork in db.............................................");
    // if (Object.keys(res))
    return UserForks.create({      
      username: req.query.username,
      parent_url: res.body.parent.url,
      parent_repo_id: res.body.parent.id,
      fork_url: res.body.url
    });
  })
  .then(function(user){
      console.log('updated user: ', JSON.stringify(user));
      res.json(user);
  }).catch(function(error) {
      console.error('error updating user: ', error);
      res.status(500);
      res.send(error);
  });
}

var deleteFork = function(req, res) {
  UserForks.findOne({where: {username: req.query.username , parent_repo_id: req.query.id}})
  .then(function (entry) {
    return entry.destroy();
  })
  .then(function () {
    console.log("Fork was removed!");
    res.sendStatus(200)
  })
  .catch(function (error) {
    console.log("There was a problem deleting the fork");
    res.status(500).send(error);
  });
}

var getForkedRepos = function (username) {
  return UserForks.findAll({where: {
    username: username
    }
  });
};

module.exports = {
  forkRepo: forkRepo,
  getForkedRepos: getForkedRepos,
  deleteFork: deleteFork
};

