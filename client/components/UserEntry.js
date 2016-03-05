const React = require('react');

const UserEntry = function (props){
  console.log('In UserEntry')
  return (
    <div onClick={props.handleClick.bind(null, props.user.id )} className='card-panel hoverable'>
      <div className='card-content'>
        <img className='circle responsive-img' src={props.user.avatar_url} width='100px'  />
        <span><h4>{props.user.name}</h4> </span> 
        <span>Forks {props.user.num_forks}</span>
        <span>Pulls {props.user.num_pulls}</span>
        <span>Merges {props.user.num_merges}</span>

        <p>
        Github: <a href={props.user.html_url}>See @{props.user.username} at Github</a>
        </p>
      </div>
    </div>
    )
}

module.exports = UserEntry