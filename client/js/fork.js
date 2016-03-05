const $ = require('jquery');

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

var deleteFork = function(successCallback, errCallback, username, repo_id) {
  var options = {
    url: '/api/fork?username='+username+'&id='+repo_id,
    type: 'DELETE',
    success: function() {
      successCallback()
    },
    error: function(error) {
      errCallback(error)
    }
  };

  $.ajax(options);
}

module.exports = {
  forkRepo: forkRepo,
  getForks: getForks,
  deleteFork: deleteFork
};