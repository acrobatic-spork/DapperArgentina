var Auth = {};

Auth.isLoggedIn = function () {
  return document.cookie.indexOf('userid') >= 0
}

Auth.getUserId= function () {
  return document.cookie.split("=")[1];
}

module.exports = Auth;