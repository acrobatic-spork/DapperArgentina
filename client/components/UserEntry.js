const React = require('react');

const UserEntry = function (props){
  console.log('In UserEntry')
  return (
    <li>
      <img src={prop.user.avatar_url} />
      {props.user.name} <br/> {prop.user.html_url} <br/>
    </li>
    )
}

module.exports = UserEntry