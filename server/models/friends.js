'use strict';

const config = '../config';
const Promise = require('bluebird');
const request = require('request-promise');

var addFriend = function (req, res) {
  Friends.create({ 
    user_id: req.body.user_id, 
    friend_id: req.body.friend_id 
  })
  .then(function(friend) {
      console.log('FRIEND: ', JSON.stringify(friend));
      res.json(friend);
    }).catch(function(error) {
      console.error('error updating user: ', error);
      res.json(error);
    });
}

var getFriends = function (req, res) {
  Friends.findAll({ where: { user_id: req.query.user_id }})
    .then(function (friends) {
      var friendId = friends.map(function (friend) {
        return friend.friend_id;
      });
      return User.findAll({ where: { id: friendId }})
    })
    .then(function (friends) {
      console.log('friend objects: ', friends);
      res.json(friends);
    })
    .catch(function (error) {
      console.error(error);
      res.json(error);
    })
}

module.exports = {
  addFriend: addFriend,
  getFriends: getFriends
};