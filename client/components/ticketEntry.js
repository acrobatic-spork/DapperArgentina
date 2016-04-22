const React = require('react');
const TimeAgo = require('../../node_modules/react-timeago/timeago');
const Link = require('react-router').Link;
const ConfirmFork = require('./ConfirmFork');
const SporkButton = require('./SporkButton');

class TicketEntry extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showConfirm: false
    };
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

  render() {
    return (
       <div className="row">
      <ConfirmFork isShowing={this.state.showConfirm} openModel={this.openConfirm.bind(this)} closeModal={this.closeConfirm.bind(this)} data={this.props.data} username={this.props.username} refreshUserInfo={this.props.refreshUserInfo} />
      <div className="card white">
        <div className="card-content black-text" >
          <div className="row">
            <div className="col s11">
              <span className="card-title ellipsis">{this.props.data.title}</span>
              <div className="row">
                <div className="col s12">
                  <span className="issue-section"><i className="octicon octicon-calendar ticket-icon"></i><TimeAgo date={this.props.data.created_at} /></span>
                  <span className="issue-section"><i className="octicon octicon-repo ticket-icon"></i><Link className="cyan-text lighten-2" to={`/repoProfile/${this.props.data.repo_id}`}>{this.props.data.org_name}/{this.props.data.repo_name}
                  </Link></span>
                  <p className="right-align right col s5">{this.props.data.language}</p>
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  {this.props.data.labels.map(function(label, index) {
                    return (
                      <div className="chip white-text hide-on-small-only" style={{'backgroundColor': '#' + label.color}} key={index}>{label.name}</div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="issue-icons col s12 m1 right center-align">
              <div className="action-icon row"><i className="material-icons activator clickable center">info_outline</i></div>
              <div className="action-icon row"><a href="#" onClick={this.props.handleClick} title="Spork this Repo"><i className="octicon octicon-repo-forked clickable"></i></a></div>
              <div className="action-icon row"><a href={this.props.data.html_url} target="_blank" title="View issue on GitHub"><i className="octicon octicon-mark-github clickable"></i></a></div>
            </div>
          </div>
      </div>
      <div className="card-reveal">
      <div className="card-title"><span className="ellipsis grey-text text-darken-4 col s11">{this.props.data.title}</span><i className="material-icons clickable right">clear</i></div>
        <p className="grey-text text-darken-2">{this.props.data.body}</p>
      </div>
    </div>
    </div>
  );
  }
}
module.exports = TicketEntry;
