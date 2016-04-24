const React = require('react');
const SporkSvg = require('./SporkSvg');

const LoadingAnimation = function (props) {
  return (
    <div className="small-loader" style={props.style}>
      <SporkSvg />
    </div>
  );
};

module.exports = LoadingAnimation;