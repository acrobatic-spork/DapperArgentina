const React = require('react');
const TimeAgo = require('../../node_modules/react-timeago/timeago');
const Link = require('react-router').Link;

const UserIssueEntry = (props) => (
  <div className="row">
    <div className="col s12 m10">
      <div className="card white">
        <div className="card-content black-text" >
          <span className="card-title activator"><a className="cyan-text lighten-2" href={props.issue.html_url} target="_blank">{props.issue.title}</a><i className="material-icons right">more_vert</i></span>
          <div className="row">
            <div className="col sm 12">  
              {props.issue.labels.map(function(label, index) {
                return (
                  <div className="chip" style={{'backgroundColor': '#' + label.color}} key={index}>
                    {label.name}
                  </div>
                )
              }
            )}
            </div>
          </div>
          <div className="row">
            <p className="left-align col s6"><span className="octicon octicon-calendar"></span> Created <TimeAgo date={props.issue.created_at} /></p>
          </div>
          <div className="row">
            <p className="left-align col s6">repo: <Link className="cyan-text lighten-2" to={`/repoProfile/${props.issue.repo_id}`}>{props.issue.repo_name}
            </Link></p>
            <p className="right-align col s6">{props.issue.language}</p>
          </div>
        </div>
      <div className="card-reveal">
        <span className="card-title grey-text text-darken-4">{props.issue.title}<i className="material-icons right">Close</i></span>
        <p>{props.issue.body}</p>
      </div>
      </div>
    </div>
  </div>
);

module.exports = UserIssueEntry;

