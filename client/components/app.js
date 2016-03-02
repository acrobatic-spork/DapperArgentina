const React = require('react');
const NavBar = require('./NavBar'); 
const LoginBar = require('./LoginBar');

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


const App = class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      route: '/',
      isLoggedIn: false
    };
  }
  
  render () {
    return (
    !this.state.isLoggedIn ? <LoginBar /> :
    <div className='app-shell grey lighten-2'>
      <NavBar links={linksList}/>
      <div>
        <User />
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