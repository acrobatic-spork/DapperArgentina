const $ = require('jquery');

module.exports = {};

module.exports.forkRepo = function (successCallback, errCallback, owner, repo, username) {
  var options = {
    url: '/api/fork?owner='+owner+'&repo='+repo+'&username='+username,
    type: 'GET',
    success: function (data) {
      successCallback(data)
    },
    error: function (error) {
      errCallback(error)
    }
  };

  $.ajax(options);  
};

module.exports.getForks = function (successCallback, errCallback, username) {
  var options = {
    url: '/api/user/forks?username='+username,
    type: 'GET',
    success: function (data) {
      successCallback(data)
    },
    error: function(error) {
      errCallback(error)
    }
  };

  $.ajax(options);  
};
