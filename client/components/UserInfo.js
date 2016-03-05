const React = require('react');
const UserRepoList = require('./UserRepoList');

class UserInfo extends React.Component {

  constructor(props) {
    super(props);
  }

  showSporks (num, color) {
    var result = [];
    for (var i = 0; i < num; i++) {
      result.push(<span className="mega-octicon octicon-mark-github" style={{color: color}}></span>);
    }
    return result;
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
          <div className="col s12 center-align blue-grey darken-3 z-depth-1" style={{'margin-bottom': '10px', padding: '5px'}}>
            <span className="white-text col s4 center-align">Forks: {this.props.forks}</span>
            <span className="white-text text-darken-1 col s4 center-align">Pulls: {this.props.pulls}</span>
            <span className="white-text text-darken-1 col s4 center-align">Merges: {this.props.merges}</span>
          </div>
          <div className="col s12 left-align" style={{'margin-bottom': '10px'}}>
            <span className="col s1 center-align mega-octicon octicon-git-branch blue-grey-text"></span>
            <span className="col s11 fork-sporks">{this.showSporks(this.props.forks, '#965A38')}</span>

          </div>
          <div className="col s12 left-align" style={{'margin-bottom': '10px'}}>
            <span className="col s1 center-align mega-octicon octicon-git-pull-request blue-grey-text"></span>
            <span className="col s11 pull-sporks">{this.showSporks(this.props.pulls, '#A8A8A8')}</span>

          </div>
          <div className="col s12 left-align" style={{'margin-bottom': '10px'}}>
            <span className="col s1 center-align mega-octicon octicon-issue-closed blue-grey-text"></span>
            <span className="col s11 merge-sporks">{this.showSporks(this.props.merges, '#C98910')}</span>            
          </div>
        </div>
        <div className="col s12">        
         <UserRepoList repos={this.props.userRepos} username={this.props.username} refreshUserInfo={this.props.refreshUserInfo}/>
        </div>
      </div>
    );
  }
}


module.exports = UserInfo;
