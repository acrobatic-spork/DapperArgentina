const React = require('react');
const getUsers = require('../js/users').getUsers;

class ShowUsers extends React.Component {
  constructor(props){
    super(props);
  }

  this.state = {
    usersToRender: []
  }

  getAllUsersList() {
    self = this;
    getUsers((data) => {
      self.setState({
        usersToRender: data
      });
    }, console.log);
  }

  componentDidMount(){
    this.getAllUsersList();
  }

  render() {
    <div>{
      this.usersToRender.length === 0 ? 'No Users to show yet' :
      <div class='all-users-view'>
      this.state.usersToRender.map((user, index) => {
        <UserEntry user={user} key={index}>
      });
      </div>
    }
    </div>
  }
}
