const React = require('react');

const SporkEntry = (props) => {
  <div className="spork">
    <span> <img src={"../img/spork" + {props.i} }/> {props.number} </span>
  </div>
}

module.exports = SporkEntry;