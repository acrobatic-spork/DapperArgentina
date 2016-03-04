const React = require('react');
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const Link = require('react-router').Link;

const UserNavEntry = (props) => (
  <li>
    <Link to={props.data.url}>{props.data.name}</Link>
  </li>
);

module.exports = UserNavEntry;