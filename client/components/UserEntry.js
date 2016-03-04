const React = require('react');

const UserEntry = function (props){
  console.log('In UserEntry')
  return (
    <div>
      <img src={props.user.avatar_url} width="50" />
      {props.user.name} <br/> {props.user.html_url} <br/>
    </div>
    )
}

module.exports = UserEntry