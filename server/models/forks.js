'use strict';

const request = require('request-promise');
const Promise = require('bluebird');
const db = require('../db/database');
const parseLink = require('parse-link-header');
const config = require('../config');
var mergeObj = require('lodash.merge');
// var path = require('path');
var User = db.User;
var UserForks = db.UserForks;


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
    return UserForks.create({      
      username: req.query.username,
      parent_url: res.body.parent.url,
      parent_repo_id: res.body.parent.id,
      fork_url: res.body.url
    })
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

var getForkedRepos = function (username) {
  return UserForks.findAll({where: {
    username: username
    }
  });
};

module.exports = {
  forkRepo: forkRepo,
  getForkedRepos: getForkedRepos
};

