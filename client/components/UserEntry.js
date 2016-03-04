const React = require('react');

const UserEntry = function (props){
  console.log('In UserEntry')
  return (
    <div className='card-panel hoverable'>
      <img className='card-image' src={props.user.avatar_url} width="50" />
      <span><h5>{props.user.name}</h5> </span> 
      <p>
      Github: <a href={props.user.html_url}>See @{props.user.username} at Github</a>
      </p>
    </div>
    )
}

module.exports = UserEntry