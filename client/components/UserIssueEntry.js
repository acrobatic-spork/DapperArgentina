const React = require('react');
const TimeAgo = require('../../node_modules/react-timeago/timeago');

const UserIssueEntry = (props) => (
  <li className="collection-item user-issue row">
    <div className="issue-title"><a className="indigo-text" href={props.issue.html_url} target="_blank">{props.issue.title}</a></div>
    <div className="col sm 12">  
      {
        props.issue.labels.map(function(label, index) {
          return (
            <div className="issue-label grey lighten-3" key={index}>
              {label.name} <div className="label-dot" style={{'backgroundColor': '#' + label.color}}></div>
            </div>
          );
        }
      )}
    </div>
    <div className="left-align col s12"><span className="octicon octicon-calendar"></span> Created <TimeAgo date={props.issue.created_at} /></div>
    <div className="truncate grey-text col s12">{props.issue.body}</div>
  </li>
);

module.exports = UserIssueEntry;

