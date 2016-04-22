const React = require('react');

const SporkButton = (props) => (
  <a href="#" className="fork-button" onClick={props.handleClick}>
    <span className={ 'octicon-repo-forked ' + (props.mega ? 'mega-octicon' : 'octicon')}></span>
    <span className="small">spork it!</span>
  </a>
);

module.exports = SporkButton;