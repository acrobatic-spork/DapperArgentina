const $ = require('jquery');

module.exports = {};

module.exports.getFriends = function (successCallback, errCallback, user_id) {
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

module.exports.addFriend = function (successCallback, errCallback, user_id, friend_id) {
  console.log('addFriend....', user_id, friend_id)
  var options = {
    url: '/api/friend', // add route to query users db for github info
    type: 'POST',
    data: {
      "user_id": user_id+"",
      "friend_id": friend_id
    },
    'Content-Type':'application/json',
    success: function (data) {
      successCallback(data)
    },
    error: function(error) {
      errCallback(error)
    }
  };
  console.log('options', options)
  $.ajax(options);  
};
