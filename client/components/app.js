const React = require('react');
const NavBar = require('./NavBar'); 
const LoginBar = require('./LoginBar');
const Users = require('../js/users');
const Auth = require('../js/auth');
const IssueList = require('./IssueList');
const forkUtil = require('../js/fork');
const { getIssues } = require('../actions');
const { connect } = require('react-redux');

const linksList = [
  {
    name: 'Issues', url: '/issues'
  },
  {
    name: 'Repos', url: '/repos'
  }, 
  {
    name: 'Leaderboard', url: '/leaderboard'
  },
  {
    name: 'Getting Started', url: '/resources'
  }
];


class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      // route: '/',
      isLoggedIn: false,
      userId: null,
      name: null,
      username: null,
      avatar_url: null,
      userRepos: null,
      forks: 0,
      pulls: 0,
      merges: 0,
      searchLanguages: ['All Languages', 'Javascript', 'CoffeeScript', 'Python', 'Java', 'Ruby', 'C++', 'HTML', 'CSS']
    };
  }

  componentWillMount() {
    this.props.getIssues();
    if (Auth.isLoggedIn()) {
      var userId = Auth.getUserId();
      this.setState({
        userId: userId,
        isLoggedIn: true
      });
      this.getUserInfo(userId);
    }
  }

  getForks(username) {
    forkUtil.getForks(function(data) {
      this.setState({
        userRepos: data || []
      });
    }.bind(this), console.error, username);
  }

  getUserInfo(userId) {
    // Get the user's information
    var self = this;

    Users.getUserInfo(function(data) {
      self.setState({
        userId: userId,
        name: data.name,
        username: data.username,
        avatar_url: data.avatar_url,
        forks: data.num_forks,
        pulls: data.num_pulls,
        merges: data.num_merges
      });
      self.getForks(data.username);
    }, function(error) {
      console.error('Problem getting user data!');
    },
    userId);
  }

  refreshUserInfo() {
    if (this.state.userId) {
      this.getUserInfo.call(this, this.state.userId);
    }
  }
  

  // Need to load the info when the user logs in
  // Add userinfo somewhere

  render () {
    var childrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, { 
        userId: this.state.userId,
        username: this.state.username,
        name: this.state.name,
        avatar_url: this.state.avatar_url,
        userRepos: this.state.userRepos,
        num_forks: this.state.forks,
        num_pulls: this.state.pulls,
        num_merges: this.state.merges,
        refreshUserInfo: this.refreshUserInfo.bind(this),
        searchLanguages: this.state.searchLanguages,
        // ...this.props 
      });
    });
    return (
    <div className='app-shell' >
    {this.state.isLoggedIn ? <NavBar links={linksList} /> : <LoginBar /> }
      <div className='row'>
        <div className='main container'>
          {this.state.isLoggedIn ? childrenWithProps : <IssueList searchLanguages={this.state.searchLanguages}/> }
        </div>
      </div>
    </div>
    );
  }

}

module.exports = connect(null, { getIssues })(App);
