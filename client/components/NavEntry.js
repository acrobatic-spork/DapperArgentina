const React = require('react');
const Link = require('react-router').Link;

const NavEntry = (props) => (
  <li>
    <Link to={props.data.url}>{props.data.name}</Link>
  </li>
);

module.exports = NavEntry;