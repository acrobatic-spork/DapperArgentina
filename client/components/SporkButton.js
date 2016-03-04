const React = require('react');

const SporkButton = (props) => (
  <a href="#" className="fork-button" onClick={props.handleClick}>
    <span className="mega-octicon octicon-git-branch"></span>
    <span className="small">spork it!</span>
  </a>
)

module.exports = SporkButton;