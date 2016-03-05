const React = require('react');
const Auth = require('../js/auth');
const getUsers = require('../js/users').getUsers;
const UserEntry = require('./UserEntry');
const UserNav = require('./UserNav');
const addFriend = require('../js/friends').addFriend;
const {browserHistory} = require('react-router');

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

  handleClick(friend_id){

    addFriend( (res) => browserHistory.push('#/friends'), (err) => console.log(err), Auth.getUserId(), friend_id );
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
          <div class='all-users-view'>
          {this.state.usersToRender.map((user, index) => {
            return (<UserEntry handleClick={this.handleClick.bind(this)} user={user} key={index}/>)
            })
          }
          </div>
      </div>)
    }
  }
}


module.exports = ShowUsers;