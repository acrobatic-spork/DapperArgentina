import React from 'react';


const LoginBar = (props) => (
  <header>
  <div className="cyan lighten-2 row login-bar">
	  <div id="logo-container" className="login-logo">
		  <a href="#">SporkHub</a>
      <a href="http://localhost:3000/auth/github">
      	<button className="login-button">
      		Login with Github<br/>to Begin <span className="octicon octicon-mark-github"></span>
    		</button>
			</a>
			</div>
			<div className="tagline">
      	<li><span className="octicon octicon-rocket"></span> Contribute to Open Source Projects.</li>
      	<li><span className="octicon octicon-rocket"></span> Earn Sporks by finding and solving outstanding issues in your favorite open source projects</li>
      </div>
			</div>
	  </header>
)

module.exports = LoginBar;