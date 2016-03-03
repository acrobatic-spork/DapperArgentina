const React = require('react');
const UserRepoList = require('./UserRepoList');

const User = (props) => ( 
  <div className="container section">
    <div className="col s12 m4 l4 center-align">
      <div>
        <img className="circle responsive-img" src={ props.avatar_url || 'http://static1.squarespace.com/static/55842e41e4b0875de16c3ebc/t/55e09d99e4b0db1790432d93/1440783771027/Profile+Holder.png' } width='200'/>
      </div>
      <div>
        <h5 className="cyan-text">{props.name || 'Name'}</h5>
        <h6 className="grey-text text-darken-1">{props.username || 'Username'}</h6>

      </div>
    </div>
    <div className="col s12 m8 l8">
     <UserRepoList repos={props.userRepos} issues={props.userIssues} />
    </div>
  </div>
);

module.exports = User;
