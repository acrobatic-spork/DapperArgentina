const React = require('react');
const UserRepoList = require('./UserRepoList');
const SporkBar = require('./SporkBar');
const LoadingAnimation = require('./LoadingAnimation');

class UserInfo extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="section">
        <div className="row center-align">
          <div>
            <img className="circle responsive-img" src={ this.props.avatar_url || 'http://static1.squarespace.com/static/55842e41e4b0875de16c3ebc/t/55e09d99e4b0db1790432d93/1440783771027/Profile+Holder.png' } width='200'/>
          </div>
          <div>
            <h5 className="cyan-text">{ this.props.name || 'Name' }</h5>
            <h6 className="grey-text text-darken-1">{this.props.username || 'Username'}</h6>
          </div>
        </div>
        <div className="row" style={{border: '1px solid grey'}}>
          <div className="col s12 center-align blue-grey darken-3 z-depth-1" style={{'marginBottom': '10px', padding: '5px'}}>
            <span className="white-text col s4 center-align">Forks: {this.props.num_forks  || 0}</span>
            <span className="white-text text-darken-1 col s4 center-align">Pulls: {this.props.num_pulls || 0}</span>
            <span className="white-text text-darken-1 col s4 center-align">Merges: {this.props.num_merges  || 0}</span>
          </div>
          <SporkBar user={this.props} size='large'/>
        </div>
        <div className="col s12">
          <h4 className="center-align grey-text text-darken-2">Your sporked repos</h4>  
          {(!Array.isArray(this.props.userRepos)) && <LoadingAnimation /> }
          { Array.isArray(this.props.userRepos) && <UserRepoList repos={this.props.userRepos} username={this.props.username} refreshUserInfo={this.props.refreshUserInfo}/> }
        </div>
      </div>
    );
  }
}


module.exports = UserInfo;
