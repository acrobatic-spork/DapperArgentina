const React = require('react');
const Link = require('react-router').Link;
const TimeAgo = require('../../node_modules/react-timeago/timeago');
const UserIssueEntry = require('./UserIssueEntry');

class UserRepoEntry extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
    <div className="row">
        <div className="col s12 m10">
          <div className="card white">
            <div className="card-content black-text" >
              <span className="card-title">
                <Link className="left cyan-text lighten-2" to={`/repoProfile/${this.props.repo.id}`}>{this.props.repo.name}</Link>
              </span>
              <div className="row">
                <p className="left-align grey-text lighten-2 col s12">{this.props.repo.description}</p>
              </div>
              <div className="row">
                <strong className={"center-align col s4" + (this.props.repo.forked ? "text-light-green" : "text-grey")}><span className="mega-octicon octicon-git-branch"></span></strong>
                <strong className={"center-align col s4" + (this.props.repo.pulled ? "text-light-green" : "text-grey")}><span className="mega-octicon octicon-git-pull-request"></span></strong>
                <strong className={"center-align col s4" + (this.props.repo.closed ? "text-light-green" : "text-grey")}><span class="mega-octicon octicon-issue-closed"></span></strong>
              </div>
              <div className="row">
                <ul className="collection">
                 {this.props.repo.issues.map ((issue, index) => 
                  <UserIssueEntry issue={issue} key={"issue-"+index} />
                )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = UserRepoEntry;


