const React = require('react');
const Link = require('react-router').Link;
const TimeAgo = require('../../node_modules/react-timeago/timeago');

class RepoEntry extends React.Component {
  constructor (props) {
    super(props);
  }

  forkRepo (){
    console.log('forkrepo');
  }

  render() {
    return (
    <div className="row">
        <div className="col s12 m10">
          <div className="card white">
            <div className="card-content black-text" >
                <div className="row">
                <div className="col s10">
                <span className="card-title">
                  <Link className="left cyan-text lighten-2" to={`/repoProfile/${this.props.data.id}`}>{this.props.data.name}
                  </Link>
                </span>
                  <p className="left-align grey-text col s12">{this.props.data.description}</p>
                </div>
                <div className="col s2 right right-align">
                  <a href="#" className="fork-button" onClick={this.forkRepo}>
                    <span className="mega-octicon octicon-git-branch"></span>
                    <span className="small">spork it!</span>
                  </a>
                </div>
                </div>
                <div className="row">
                  <strong className="left-align col s3"><span className="octicon octicon-history"></span> updated <TimeAgo date={this.props.data.updated_at} /></strong>
                  <strong className="center col s3"><span className="octicon octicon-issue-opened"></span> Issues {this.props.data.beginner_tickets}</strong>
                  <strong className="center col s3"><span className="octicon octicon-git-branch"></span> Forks {this.props.data.forks}</strong>
                </div>
                <div className="row">
                  <strong className="left-align col s3"><a className="cyan-text lighten-2" href={"http://www.github.com/" + this.props.data.org_name} target="_blank">{this.props.data.org_name}</a></strong>
                  <strong className="center col s3" ><a className="cyan-text lighten-2" href={this.props.data.html_url} target="_blank">Repo on Github</a></strong>
                  <strong className="center col s3">{this.props.data.language || 'not specified'}</strong>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = RepoEntry;


