const $ = require('jquery');

module.exports = {};

var getFriendsFromApi = function (successCallback, errCallback, user_id) {
  var options = {
    url: '/api/friend?user_id='+user_id, // add route to query users db for github info
    type: 'GET',
    success: successCallback,
    error: errCallback
  };

  $.ajax(options);  
};

// Get a url for pic, array of sporks...
module.exports.getFriends = function(successCallback, errCallback, user_id) {
  getFriendsFromApi((data) => {
    return successCallback(data);
  }, errCallback, user_id);
};

var addFriendToApi = function (successCallback, errCallback, user_id, friend_id) {
  var options = {
    url: '/api/friend', // add route to query users db for github info
    type: 'POST',
    body: {
      user_id: user_id,
      friend_id: friend_id
    }
    success: successCallback,
    error: errCallback
  };

  $.ajax(options);  
};

// Get a url for pic, array of sporks...
module.exports.addFriend = function(successCallback, errCallback, user_id, friend_id) {
  addFriendToApi((data) => {
    return successCallback(data);
  }, errCallback, user_id);
};