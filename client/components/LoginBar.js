import React from 'react';
const TicketList = require('./TicketList');


const LoginBar = (props) => (
	<div>
		<ul className = 'login-bar'>
			<li>Contribute to Open Source Projects.</li>
			<li>Earn Sporks by finding and solving outstanding issues in your favorite open source projects</li>
			<button><a href="http://localhost:3000/auth/github">Login with Github</a></button>
		</ul>
		<div className='app-shell grey lighten-2'>
			<TicketList />
		</div>
	</div>
	)

module.exports = LoginBar;