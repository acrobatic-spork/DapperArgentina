const React = require('react');
const getUsers = require('../js/users').getUsers;
const UserEntry = require('./UserEntry');
const UserNav = require('./UserNavSub');
const addFriend = require('../js/friends').addFriend;

const navLinks = [
  {
    name: "Users / Add Users", url: '/users'
  },
  {
    name: "Friends", url: '/friends'
  }
];

const ShowUsers = class ShowUsers extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      usersToRender: []
    }
  }

  getAllUsersList() {
    self = this;
    getUsers((data) => {
      if(data.length){
        self.setState({
          usersToRender: data
        });
      }
    }, console.log);
  }

  componentDidMount(){
    this.getAllUsersList();
  }

  render() {
    if(this.state.usersToRender.length === 0){
     return (<div><UserNav links={navLinks}/>
              <div>No Users to show</div></div>) 
    } else {
        return (
        <div>
          <UserNav links={navLinks}/>
          <div class='all-users-view'>
          {this.state.usersToRender.map((user, index) => {
            return (<UserEntry user={user} key={index}/>)
            })
          }
          </div>
      </div>)
    }
  }
}


module.exports = ShowUsers;