const $ = require('jquery');

module.exports = {};

module.exports.getUserInfo = function(successCallback, errCallback, user) {
  var options = {
    url: '/api/users/'+user, // add route to query users db for github info
    type: 'GET',
    success: function(data) {
      successCallback(data)
    },
    error: function(error) {
      errCallback(error)
    }
  };

  $.ajax(options); 
};

module.exports.getUsers = function(successCallback, errCallback) {
  var options = {
    url: '/api/users',
    type: 'GET',
    success: function (data) {
      successCallback(data);
    },
    error: function (error) {
      errCallback(error);
    }
  };
  $.ajax(options);
};