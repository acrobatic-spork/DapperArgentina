const React = require('react');
const UserNavEntry = require('./UserNavEntry');

const UserNav = function (props) {
  return (
  <div>
      <nav className="grey darken-3" role="navigation">
        <div className="nav-wrapper">
          <ul className="left">
            {props.links.map ((link, index) => 
              <UserNavEntry data={link} key={index} />
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

module.exports = UserNav;

