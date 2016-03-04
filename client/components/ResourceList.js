import React from 'react';
const GitInstruct = require('./GitHubInstructions');
const Guides = require('./Guides');
const ConfirmFork = require('./ConfirmFork');


const ResourceList = (props) => (
  <div className="row"> 
    <div className="col s12 m12">
      <h4>Getting Started</h4>
      <blockquote>
      Want to contribute to open source projects on GitHub, but unsure where to start? You've come to the right place!
      We comb through active repos to find the easy issues that beginners can handle. Still not ready to dive in? Check out these guides:
      </blockquote>
      <ul className="collapsible popout" data-collapsible="accordion">
        <li>
          <div className="collapsible-header active"><i className="material-icons">filter_drama</i><strong>How to Play</strong></div>
            <div className="collapsible-body"><GitInstruct /></div>
        </li>
        <li>
          <div className="collapsible-header"><i className="material-icons">filter_drama</i><strong>Strategy Guides</strong></div>
            <div className="collapsible-body"><Guides /></div>
        </li>
      </ul>
    </div>
  </div>
);

module.exports = ResourceList;