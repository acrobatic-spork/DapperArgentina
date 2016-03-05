var Auth = {};
const {browserHistory} = require('react-router');

Auth.isLoggedIn = function () {
  return document.cookie.indexOf('userid') >= 0
}

Auth.getUserId= function () {
  return document.cookie.split("=")[1];
}

Auth.logOut = function () {
  document.cookie = 'connect.sid=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  document.cookie = 'userid=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  browserHistory.push('/')
}

module.exports = Auth;