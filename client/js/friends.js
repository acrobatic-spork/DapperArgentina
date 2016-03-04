const $ = require('jquery');

module.exports = {};

var getFriends = function (successCallback, errCallback, user_id) {
  var options = {
    url: '/api/friend?user_id='+user_id, // add route to query users db for github info
    type: 'GET',
    success: function (data) {
      successCallback(data)
    },
    error: function(error) {
      errCallback(error)
    }
  };

  $.ajax(options);  
};

var addFriend = function (successCallback, errCallback, user_id, friend_id) {
  var options = {
    url: '/api/friend', // add route to query users db for github info
    type: 'POST',
    body: {
      user_id: user_id,
      friend_id: friend_id
    }
    success: function (data) {
      successCallback(data)
    },
    error: function(error) {
      errCallback(error)
    }
  };

  $.ajax(options);  
};
