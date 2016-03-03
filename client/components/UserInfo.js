const React = require('react');
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const Link = require('react-router').Link;

const User = () => (
  <div>
    <div>
      <img src={'http://static1.squarespace.com/static/55842e41e4b0875de16c3ebc/t/55e09d99e4b0db1790432d93/1440783771027/Profile+Holder.png'} width='200'/>
    </div>
    <div>
      <h4>Name</h4>
      <h6>Username</h6>
      <h6>Email</h6>
    </div>
  </div>
);

module.exports = User;
