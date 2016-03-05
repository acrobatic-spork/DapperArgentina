const React = require('react');
const Link = require('react-router').Link;
const TimeAgo = require('../../node_modules/react-timeago/timeago');
const UserIssueEntry = require('./UserIssueEntry');
const Repos = require('../js/repos');
const Issues = require('../js/issues');
const ConfirmDelete = require('./ConfirmDelete'); 

class UserRepoEntry extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      repoToRender: {},
      issues: [],
      showConfirm: false
    };

    this.getRepo = this.getRepo.bind(this);
  }

  componentWillMount() {
    this.getRepo(this.props.data.id);
  }

  componentDidMount () {
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
  }

  handleClick (e) {
    e.preventDefault();
    this.setState({
      showConfirm: true
    });
  }

  openConfirm () {
    this.setState({
      showConfirm: true
    });
  }

  closeConfirm () {
    this.setState({
      showConfirm: false
    });
  }

  getRepo(id) {
    Repos.getRepoById(id, (data) => this.setState({repoToRender: data}));
    Issues.getIssuesByRepoId(id, data => this.setState({issues: data}));
  }

  render() {
    return (
    <div className="row">
      <ConfirmDelete isShowing={this.state.showConfirm} openModel={this.openConfirm.bind(this)} closeModal={this.closeConfirm.bind(this)} data={this.props.data} username={this.props.username} refreshUserInfo={this.props.refreshUserInfo}/>
        <div className="col s12">
          <div className="card white">
            <div className="card-content" >
              <span className="card-title">
                <Link className="left cyan-text lighten-2" to={`/repoProfile/${this.state.repoToRender.id}`}>{this.state.repoToRender.name}</Link>
                <a href="#" onClick={this.handleClick.bind(this)} className="right delete-icon"><i className="material-icons">delete</i></a>
              </span>
              <div className="row">
                <p className="left-align grey-text lighten-2 col s12">{this.state.repoToRender.description}</p>
              </div>
              <div className="row">
                <strong className={"center-align col s4" + (true ? " light-green-text" : " grey-text")}><span className="mega-octicon octicon-repo-forked"></span>forked!</strong>
                <strong className={"center-align col s4" + (this.props.data.pulls ? " light-green-text" : " grey-text")}><span className="mega-octicon octicon-git-pull-request"></span> {this.props.data.pulls} pull requests</strong>
                <strong className={"center-align col s4" + (this.props.data.merges ? " light-green-text" : " grey-text")}><span className="mega-octicon octicon-issue-closed"></span> {this.props.data.merges} merged</strong>
              </div>
              <ul className="collapsible" data-collapsible="accordion">
                <li>
                  <div className="collapsible-header hoverable light-green-text"><span className="octicon octicon-issue-opened"></span> Beginner Issues</div>
                    <div className="collapsible-body">
                      <ul className="collection">
                       {this.state.issues.map ((issue, index) => 
                        <UserIssueEntry issue={issue} key={"issue-"+index} />
                      )}
                      </ul>
                    </div>
                  </li>
                </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = UserRepoEntry;


