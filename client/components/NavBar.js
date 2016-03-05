const React = require('react');
const Auth = require('../js/auth')
const NavEntry = require('./NavEntry');
const OctosporkSvg = require('./OctosporkSvg');

const NavBar = class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount () {
    $('.button-collapse').sideNav();
  }
  
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="indigo darken-4" role="navigation">
          <div className="nav-wrapper container col s12 l8">
            <a className="nav-logo" href="#">
              <div style={{display:"inline-block", width:"2em"}}><OctosporkSvg /></div>
              SporkHub
            </a>
            <ul className="right hide-on-med-and-down">
              {this.props.links.map ((link, index) => 
                <NavEntry data={link} key={index} />
              )}
              <li>
                <a href='' onClick={Auth.logOut}>Log Out</a>
              </li>
            </ul>
            <ul id="nav-mobile" className="side-nav">
              {this.props.links.map ((link, index) => 
                <NavEntry data={link} key={index} />
              )}
            </ul>
            <a href="#" data-activates="nav-mobile" className="button-collapse hide-on-large-only"><i className="material-icons">menu</i></a>
          </div>
        </nav>
      </div>
    );
  }
  
};

module.exports = NavBar;