const $ = require('jquery');

module.exports = {};

// Just make one call and store it on the state, pass as props
var getSporksFromApi = function (successCallback, errCallback, user) {
  var options = {
    url: '/api/users/'+user, // add route to query users db for sporks
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
    url: '/api/users/'+user, // add route to query users db for github info
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
