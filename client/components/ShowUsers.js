const React = require('react');
const getUsers = require('../js/users').getUsers;
const UserEntry = require('./UserEntry');
const UserNav = require('./UserNav');

const navLinks = [
  {
    name: "Add Friends", url: '/users'
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
    console.log('in getAllUsersList')
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
      console.log('length 0')
     return (<div>
              <div>No Users to show</div></div>) 
    } else {
      console.log('about to render');
        return (
        <div>
          <UserNav links={navLinks}/>
          <div className='all-users-view'>
          {this.state.usersToRender.map((user, index) => {
            return (<UserEntry user={user} key={index} friend_id={user.id}/>)
            })
          }
          </div>
      </div>)
    }
  }
}


module.exports = ShowUsers;