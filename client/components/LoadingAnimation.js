const React = require('react');

const LoadingAnimation = function (props) {
  return (
    <div className="anim-box" >
      <h5 className="indigo-text darken-4">Loading...</h5>
      <img src="/images/spork-cyan.png" />
    </div>
  );
};

module.exports = LoadingAnimation;