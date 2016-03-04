const $ = require('jquery');

module.exports = {};

var getUserInfoFromApi = function (successCallback, errCallback, user) {
  var options = {
    url: '/api/users/'+user, // add route to query users db for github info
    type: 'GET',
    success: successCallback,
    error: errCallback
  };

  $.ajax(options);  
};

// Get a url for pic, array of sporks...
module.exports.getUserInfo = function(successCallback, errCallback, user) {
  getUserInfoFromApi((data) => {
    return successCallback(data);
  }, errCallback, user);
};

var getUsersFromApi = function (successCallback, errCallback) {
  var options = {
    url: '/api/users',
    type: 'GET',
    success: successCallback,
    error: errCallback
  };

  $.ajax(options);  
};

// Get a url for pic, array of sporks...
module.exports.getUsers = function(successCallback, errCallback) {
  getUserInfoFromApi((data) => {
    return successCallback(data);
  }, errCallback);
};