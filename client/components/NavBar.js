const NavEntry = require('./NavEntry');
const React = require('react');
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const Link = require('react-router').Link;


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
        <nav className="cyan lighten-2" role="navigation">
          <div className="nav-wrapper container col s12 l8"><a className="nav-logo" href="#">SporkHub</a>
            <ul className="right hide-on-small-and-down">
              {this.props.links.map ((link, index) => 
                <NavEntry data={link} key={index} />
              )}
            </ul>
            <ul id="nav-mobile" className="side-nav">
              {this.props.links.map ((link, index) => 
                <NavEntry data={link} key={index} />
              )}
            </ul>
            <a href="#" data-activates="nav-mobile" className="button-collapse hide-on-med-and-up"><i className="material-icons">menu</i></a>
          </div>
        </nav>
      </div>
    );
  }
  
};

module.exports = NavBar;