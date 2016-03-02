const React = require('react');
const NavBar = require('./NavBar'); 
const LoginBar = require('./LoginBar');
const User = require('../js/users');

const linksList = [
  {
    name: "Tickets", url: '/'
  },
  {
    name: "Repos", url: '/repos'
  }, 
  {
    name: "Getting Started", url: '/resources'
  }
];


class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      route: '/',
      isLoggedIn: false,
      user: null,
      img: null,
      sporks: []
    };
  }

  getUserInfo(user){
    // Get the user's information
    var self = this;

    Users.getUserInfo(function(data) {
      self.setState({
        sporks: data.sporks,
        user: data.user
      });
    }, function(error) {
      console.error("Problem getting user data!");
    },
    user);
  }

  // Need to load the info when the user logs in
  
  render () {
    return (
    !this.state.isLoggedIn ? <LoginBar /> :
    <div className='app-shell grey lighten-2'>
      <NavBar links={linksList}/>
      <div>
        <User img={this.state.img}/>
      </div>
      <div className="row">
        <div className="main col-sm-10 container">
          {this.props.children}
        </div>
      </div>
    </div>
    );
  }

};
module.exports = App;