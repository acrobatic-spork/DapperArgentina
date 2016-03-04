const React = require('react');
const Link = require('react-router').Link;
const TimeAgo = require('../../node_modules/react-timeago/timeago');
const UserIssueEntry = require('./UserIssueEntry');
const Repos = require('../js/repos');
const Issues = require('../js/issues'); 

class UserRepoEntry extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      repoToRender: {},
      issues: []
    };

    this.getRepo = this.getRepo.bind(this);
  }

  componentWillMount() {
    this.getRepo(this.props.data.id);
  }

  getRepo(id) {
    var that = this;
    Repos.getRepoById(id, (data) => this.setState({repoToRender: data}));
    Issues.getIssuesByRepoId(id, data => this.setState({issues: data}));
  }

  render() {
    return (
    <div className="row">
        <div className="col s12">
          <div className="card white">
            <div className="card-content black-text" >
              <span className="card-title">
                <Link className="left cyan-text lighten-2" to={`/repoProfile/${this.state.repoToRender.id}`}>{this.state.repoToRender.name}</Link>
              </span>
              <div className="row">
                <p className="left-align grey-text lighten-2 col s12">{this.state.repoToRender.description}</p>
              </div>
              <div className="row">
                <strong className={"center-align col s4" + (true ? " light-green-text" : " grey-text")}><span className="mega-octicon octicon-git-branch"></span>forked!</strong>
                <strong className={"center-align col s4" + (this.props.data.pulls ? " light-green-text" : " grey-text")}><span className="mega-octicon octicon-git-pull-request"></span> {this.props.data.pulls} pull requests</strong>
                <strong className={"center-align col s4" + (this.props.data.merges ? " light-green-text" : " grey-text")}><span className="mega-octicon octicon-issue-closed"></span> {this.props.data.merges} merged</strong>
              </div>
              <div className="row">
                <ul className="collection">
                 {this.state.issues.map ((issue, index) => 
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


