const $ = require('jquery');

module.exports = {};

var forkRepoFromApi = function (successCallback, errCallback, owner, repo, username) {
  var options = {
    url: '/api/fork?owner='+owner+'&repo='+repo+'&username='+username,
    type: 'GET',
    success: successCallback,
    error: errCallback
  };

  $.ajax(options);  
};

module.exports.forkRepo = function(successCallback, errCallback, owner, repo, username) {
  forkRepoFromApi((data) => {
    return successCallback(data);
  }, errCallback, owner, repo, username);
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
  getForksFromApi((data) => {
    console.log('got fork data: ' + data);
    return successCallback(data);
  }, errCallback, username);
};

