const Route = require('react-router').Route;
const Link = require('react-router').Link;
const React = require('react');

class UserNavEntry extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
  return (<li>
      <Link to={this.props.data.url}>{this.props.data.name}</Link>
    </li>)
  }
  
}

module.exports = UserNavEntry;