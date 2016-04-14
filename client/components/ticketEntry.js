const React = require('react');
const TimeAgo = require('../../node_modules/react-timeago/timeago');
const Link = require('react-router').Link;

const TicketEntry = (props) => (
  <div className="row">
    <div className="col s12 m12">
      <div className="card white">
        <div className="card-content black-text" >
          <div className="row">
            <div className="col s10">
              <div className="row">
                <span className="card-title col s12"><a className="cyan-text lighten-2" href={props.data.html_url} target="_blank">{props.data.title}</a></span>
              </div>
              <div className="row">
                <p className="col s6"><span className="octicon octicon-calendar ticket-icon"></span><TimeAgo date={props.data.created_at} />
                <span className="octicon octicon-repo ticket-icon"></span> <Link className="cyan-text lighten-2" to={`/repoProfile/${props.data.repo_id}`}>{props.data.org_name}/{props.data.repo_name}
                </Link></p>
                <i className="material-icons center activator col s1">info_outline</i>
                <p className="right-align right col s5">{props.data.language}</p>
              </div>
            </div>
            <div className="col s2">  
              {props.data.labels.map(function(label, index) {
                return (
                  <div className="chip white-text hide-on-small-only" style={{'backgroundColor': '#' + label.color, 'display': 'block'}} key={index}>
                    {label.name}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      <div className="card-reveal">
        <span className="card-title grey-text text-darken-4">{props.data.title}<i className="material-icons right">not_interested</i></span>
        <p>{props.data.body}</p>
      </div>
      </div>
    </div>
  </div>
);

module.exports = TicketEntry;

