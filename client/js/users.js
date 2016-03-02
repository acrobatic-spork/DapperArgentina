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
  getUserFromApi((data) => {
    return successCallback(data);
  }, errCallback, user);
};
