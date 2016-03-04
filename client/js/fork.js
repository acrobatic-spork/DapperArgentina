const $ = require('jquery');

module.exports = {};

var forkRepo = function (successCallback, errCallback, owner, repo, username) {
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

var getForks = function (successCallback, errCallback, username) {
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
