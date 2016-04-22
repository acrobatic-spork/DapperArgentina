const $ = require('jquery');

const getFollowedUsers = function (successCallback, errCallback, userId) {
  var options = {
    url: '/api/friend?user_id=' + userId, // add route to query users db for github info
    type: 'GET',
    success: function (data) {
      successCallback(data);
    },
    error: function(error) {
      console.log('error getting followed users: ', error);
      errCallback(error);
    }
  };

  $.ajax(options);  
};

const followUser = function (successCallback, errCallback, userId, friendId) {
  console.log('the stuff sent: ' + userId + ' ' + friendId);
  var toSend = {
    userId,
    friendId
  };
  var options = {
    url: '/api/friend', // add route to query users db for github info
    type: 'POST',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(toSend),
    success: function (data) {
      successCallback(data);
    },
    error: function(error) {
      console.log('error following user:', error);
      errCallback(error);
    }
  }; 
  $.ajax(options);
};

const unfollowUser = (successCallback, errCallback, userId, friendId) => {
  var toSend = {
    userId,
    friendId
  };
  var options = {
    url: '/api/friend',
    type: 'DELETE',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(toSend),
    success: function (data) {
      successCallback(data);
    },
    error: function(error) {
      console.log('error following user:', error);
      errCallback(error);
    }
  }; 
  $.ajax(options);
};

module.exports = {
  getFollowedUsers,
  followUser,
  unfollowUser
};
