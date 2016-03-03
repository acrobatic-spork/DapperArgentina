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

var getUserIssuesFromApi = function (successCallback, errCallback, user_id, username) {
  var options = {
    url: '/api/users/issues?id='+user_id+'&username='+username,
    type: 'GET',
    success: successCallback,
    error: errCallback
  };

  $.ajax(options);  
};

module.exports.getUserIssues = function(successCallback, errCallback, user_id, username) {
  getUserInfoFromApi((data) => {
    return successCallback(data);
  }, errCallback, user_id, username);
};

var forkRepoFromApi = function (successCallback, errCallback, owner, repo) {
  var options = {
    url: '/api/fork?owner='+owner+'&repo='+repo,
    type: 'GET',
    success: successCallback,
    error: errCallback
  };

  $.ajax(options);  
};

module.exports.forkRepo = function(successCallback, errCallback, owner, repo) {
  getUserInfoFromApi((data) => {
    return successCallback(data);
  }, errCallback, owner, repo);
};