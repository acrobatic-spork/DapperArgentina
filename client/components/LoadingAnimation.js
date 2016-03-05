const React = require('react');

const LoadingAnimation = function (props){
  console.log('In LoadingAnimation')
  return (
    <div className="anim-box" >
    <span className="cyan-text">Loading...</span>
    <img src="/images/spork-cyan.png" /></div>
  )
}

module.exports = LoadingAnimation