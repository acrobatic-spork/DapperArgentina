const $ = require('jquery');

module.exports = {};

module.exports.getFriends = function (successCallback, errCallback, user_id) {
  var options = {
    url: '/api/friend?user_id='+user_id, // add route to query users db for github info
    type: 'GET',
    success: function (data) {
      console.log('getFriends client, data:', data)
      successCallback(data)
    },
    error: function(error) {
      console.log('derror in getFriends: ', error);
      errCallback(error)
    }
  };

  $.ajax(options);  
};

module.exports.addFriend = function (successCallback, errCallback, user_id, friend_id) {
  console.log('addFriend....', user_id, friend_id)
  var toSend = {
      user_id: user_id,
      friend_id: friend_id
    };
  var options = {
    url: '/api/friend', // add route to query users db for github info
    type: 'POST',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(toSend),
    success: function (data) {
      console.log('add friend:', data)
      successCallback(data)
    },
    error: function(error) {
      errCallback(error)
    }
  });  
};
