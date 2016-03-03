const $ = require('jquery');

module.exports = {};

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

var getForksFromApi = function (successCallback, errCallback, username) {
  var options = {
    url: '/api/user/forks?username='+username,
    type: 'GET',
    success: successCallback,
    error: errCallback
  };

  $.ajax(options);  
};

module.exports.getForks = function(successCallback, errCallback, username) {
  getUserInfoFromApi((data) => {
    return successCallback(data);
  }, errCallback, username);
};

