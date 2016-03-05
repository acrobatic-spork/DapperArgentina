
//Code that starts app goes here
const React = require('react');
const ReactDOM = require('react-dom');
const { Router, Route, IndexRoute, browserHistory, hashHistory } = require('react-router');

const App = require('./components/app');
const TicketList = require('./components/TicketList'); 
const RepoList = require('./components/RepoList'); 
const RepoProfile = require('./components/RepoProfile'); 
const ResourceList = require('./components/ResourceList');
const UserInfo = require('./components/UserInfo');
const ShowUsers = require('./components/ShowUsers');
const ShowFriends = require('./components/ShowFriends');
const Leaderboard = require('./components/Leaderboard');

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={UserInfo} />
      <Route path='users' component={ShowUsers} />
      <Route path='friends' component={ShowFriends}/> 
      <Route path='leaderboard' component={Leaderboard}/> 
      <Route path='issues' component={TicketList} />
      <Route path='repos' component={RepoList} />
      <Route path='repoProfile/:repoId' component={RepoProfile} />
      <Route path='resources' component={ResourceList} />
    </Route>
  </Router>
), document.getElementById('app'));



