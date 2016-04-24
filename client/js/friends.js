const $ = require('jquery');

const getFollowedUsers = function (successCallback, errCallback, userId) {
  var options = {
    url: '/api/friend?user_id=' + userId, 
    type: 'GET',
    success: function (data) {
      successCallback(data);
    },
    error: function(error) {
      console.error('error getting followed users: ', error);
      errCallback(error);
    }
  };
  $.ajax(options);  
};

const followUser = function (successCallback, errCallback, userId, friendId) {
  var toSend = {
    userId,
    friendId
  };
  var options = {
    url: '/api/friend', 
    type: 'POST',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(toSend),
    success: function (data) {
      successCallback(data);
    },
    error: function(error) {
      console.error('error following user:', error);
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
      console.log('user was unfollowed');
      successCallback(data);
    },
    error: function(error) {
      console.error('error unfollowing user:', error);
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
