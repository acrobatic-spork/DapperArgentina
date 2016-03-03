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

// var getUserReposFromApi = function (successCallback, errCallback, user_id, username) {
//   var options = {
//     url: '/api/users/forks?id='+user_id+'&username='+username,
//     type: 'GET',
//     success: successCallback,
//     error: errCallback
//   };

//   $.ajax(options);  
// };

// module.exports.getUserRepos = function(successCallback, errCallback, user_id, username) {
//   getUserReposFromApi((data) => {
//     return successCallback(data);
//   }, errCallback, user_id, username);
// };
