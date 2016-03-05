const React = require('react');
const UserNavEntry = require('./UserNavEntry')

const UserNav = function (props) {
  console.log('In UserNav............')
  return (
    <div >
            <nav className="grey darken-3 col s16 push-s1" role="navigation">
              <div className="nav-wrapper container col s6 l8">
                <ul className="right hide-on-small-and-down">
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

