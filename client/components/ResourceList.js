import React from 'react';
const GitInstruct = require('./GitHubInstructions');
const Guides = require('./Guides');

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
          <GitInstruct />
        </li>
        <li>
          <Guides />
        </li>
      </ul>
    </div>
  </div>
);

module.exports = ResourceList;