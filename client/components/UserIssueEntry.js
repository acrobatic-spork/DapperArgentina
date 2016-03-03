const React = require('react');
const TimeAgo = require('../../node_modules/react-timeago/timeago');
const Link = require('react-router').Link;

const UserIssueEntry = (props) => (
  <li>

          <span className="card-title activator"><a className="cyan-text lighten-2" href={props.issue.html_url} target="_blank">{props.issue.title}</a><i className="material-icons right">more_vert</i></span>
          <div className="row">
            <div className="col sm 12">  
              {props.issue.labels.map(function(label, index) {
                return (
                  <div className="chip text-white" style={{'backgroundColor': '#' + label.color}} key={index}>
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
        </div>
      <div className="card-reveal">
        <p>{props.issue.body}</p>
  </li>
);

module.exports = UserIssueEntry;

