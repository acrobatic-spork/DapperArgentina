const React = require('react');
const NavBar = require('./NavBar'); 
const LoginBar = require('./LoginBar');
const Users = require('../js/users');
const Auth = require('../js/auth')
const User = require('./UserInfoView');
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
      userId: null,
      name: null,
      userName: null,
      img: null,
      sporks: []
    };
  }

  componentDidMount(){
    console.log('component mounted: ', Auth.getUserId())
    if(Auth.isLoggedIn()){
     var userId = Auth.getUserId();
      this.setState({
        userId: userId,
        isLoggedIn: true
      });
      console.log('user id ', userId);
      this.getUserInfo(userId);
    }
  }


  getUserInfo(userId){
    // Get the user's information
    var self = this;

    Users.getUserInfo(function(data) {
      self.setState({
        userId: data.id,
        name: data.name,
        userName: data.username,
        img: data.avatar_url
      });
      console.log('success callback, data:', data);
    }, function(error) {
      console.error("Problem getting user data!");
    },
    userId);
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