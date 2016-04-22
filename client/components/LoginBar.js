import React from 'react';
const OctosporkSvg = require('./OctosporkSvg');

const LoginBar = (props) => (
  <header>
  <div className="indigo darken-4 row login-bar">
	  <div className="login-logo">
		  <a href="#">
      <div style={{display:"inline-block", width:"2em"}}><OctosporkSvg /></div>
      SporkHub</a>
      <a href="/auth/github">
      	<button className="login-button">
      		Login with Github<br/>to Begin <span className="octicon octicon-mark-github"></span>
    		</button>
			</a>
			</div>
			<div className="tagline">
      	<li><span className="octicon octicon-rocket"></span> Contribute to Open Source Projects.</li>
      	<li><span className="octicon octicon-rocket"></span> Earn Spork points by finding and solving outstanding issues in your favorite open source projects</li>
      </div>
			</div>
	  </header>
)

module.exports = LoginBar;