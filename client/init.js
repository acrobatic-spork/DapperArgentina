
//Code that starts app goes here
const React = require('react');
const ReactDOM = require('react-dom');
const { Router, Route, IndexRoute, browserHistory, hashHistory } = require('react-router');

const { Provider, connect } = require('react-redux');
const { store } = require('./store');

const App = require('./components/app');
const IssueList = require('./components/IssueList'); 
const RepoList = require('./components/RepoList'); 
const RepoProfile = require('./components/RepoProfile'); 
const ResourceList = require('./components/ResourceList');
const UserInfo = require('./components/UserInfo');
const AllUsers = require('./components/AllUsers');
const Following = require('./components/Following');
const Leaderboard = require('./components/Leaderboard');

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={UserInfo} />
        <Route path='users' component={AllUsers} />
        <Route path='following' component={Following}/> 
        <Route path='leaderboard' component={Leaderboard}/> 
        <Route path='issues' component={IssueList} />
        <Route path='repos' component={RepoList} />
        <Route path='repoProfile/:repoId' component={RepoProfile} />
        <Route path='resources' component={ResourceList} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));



