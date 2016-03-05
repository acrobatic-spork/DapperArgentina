const React = require('react');
const UserNavEntry = require('./UserNavEntry')

const UserNav = function (props) {
  return (
        <div>
            <nav className="grey darken-3" role="navigation">
              <div className="nav-wrapper navbar-fixed">
                <ul className="left hide-on-small-and-down">
                  {props.links.map ((link, index) => 
                    <UserNavEntry data={link} key={index} />
                  )}
                </ul>
                <ul id="nav-mobile" className="side-nav">
                  {props.links.map ((link, index) => 
                    <UserNavEntry data={link} key={index} />
                  )}
                </ul>
                <a href="#" data-activates="nav-mobile" className="button-collapse hide-on-med-and-up"><i className="material-icons">menu</i></a>
              </div>
            </nav>
          </div>
          )
}

module.exports = UserNav;

