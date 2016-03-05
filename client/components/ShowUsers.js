const React = require('react');
const getUsers = require('../js/users').getUsers;
const UserEntry = require('./UserEntry');
const UserNav = require('./UserNav');
const addFriend = require('../js/friends').addFriend;
const getFriends = require('../js/friends').getFriends;
const {browserHistory} = require('react-router');
const navLinks = require('./NavLinks');
const Auth = require('../js/auth');


const ShowUsers = class ShowUsers extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      usersToRender: [],
      friendIdObject: {}
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

  getAllFriendsList() {
    self = this;
    getFriends((data) => {
      console.log('In get all friends', data)
      if(data.length){
        var friendIdObject = {};
        data.forEach((friend) => {
          friendIdObject[friend.id] = friend.id;
        })
          self.setState({
            friendIdObject: friendIdObject
          });
      }
    }, console.log, Auth.getUserId());
  }

  componentDidMount(){
    this.getAllUsersList();
    this.getAllFriendsList();
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
            if(user.username !== this.props.username) {
              if(user.id in this.state.friendIdObject) {
                return (<UserEntry isFriend='true' user={user} key={index} friend_id={user.id}/>)
              } else {
                return (<UserEntry isFriend='false' user={user} key={index} friend_id={user.id}/>)
              }
            }
            })
          }
          </div>
      </div>)
    }
  }
}


module.exports = ShowUsers;