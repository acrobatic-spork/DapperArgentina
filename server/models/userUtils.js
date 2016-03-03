const userUtil = {};
const config = '../config';
const Promise = require('bluebird');
const request = require('request-promise');

var baseGithubOptions = {
  json: true, //parses the responses body to automatically be js obj
  resolveWithFullResponse: true, //provides full reponse and not just body (so we get headers)
  headers: { 'User-Agent': 'GitBegin App' },
  qs: {client_id: config.githubClientId,
  client_secret: config.githubSecret}
};

var stats ={};
userUtil.getStatsOfRepos = function(user) {
  var options = {url: 'https://api.github.com/users/'+user+'/repos'}
  Object.assign(options, baseGithubOptions);
  return request.get(options).then((results) => {
    stats.totalStars = 0;
    stats.forkedRepos = 0;
    results.body.forEach((repo) => {
      stats.totalStars += repo.stargazers_count;
      stats.forkedRepos += repo.fork ? 1 : 0;
    });
    return stats;
  })
  .then(console.log)
  .catch(console.log)
}

userUtil.getStatsOfRepos('allenjprice')