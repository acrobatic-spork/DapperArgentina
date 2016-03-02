const $ = require('jquery');

module.exports = {};

var getSporksFromApi = function (successCallback, errCallback, user) {
  var options = {
    url: 'http://45.55.29.22:3000/api/', // add route to query users db for sporks
    type: 'GET',
    success: successCallback,
    error: errCallback
  };

  $.ajax(options);  
};

module.exports.getSporks = function(successCallback, errCallback, user) {
  getSporksFromApi((data) => {
    return successCallback(data);
  }, errCallback, user);
};

var getUserInfoFromApi = function (successCallback, errCallback, user) {
  var options = {
    url: 'http://45.55.29.22:3000/api/user', // add route to query users db for github info
    type: 'GET',
    success: successCallback,
    error: errCallback
  };

  $.ajax(options);  
};

module.exports.getUserInfo = function(successCallback, errCallback, user) {
  getUserFromApi((data) => {
    return successCallback(data);
  }, errCallback, user);
};
