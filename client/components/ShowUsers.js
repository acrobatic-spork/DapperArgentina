const React = require('react');
const getUsers = require('../js/users').getUsers;
const UserEntry = require('./UserEntry');
const UserNav = require('./UserNav');
const followUser = require('../js/friends').followUser;
const getFollowedUsers = require('../js/friends').getFollowedUsers;
const {browserHistory} = require('react-router');
const navLinks = require('./NavLinks');
const Auth = require('../js/auth');


class ShowUsers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      usersToRender: [],
      friendIdObject: {}
    };
  }

  getAllUsersList() {
    self = this;
    getUsers((data) => {
      if (data.length) {
        var usersToRender = data.filter((user) => {
          return user.username !== this.props.username;
        });
        self.setState({
          usersToRender
        });
      }
    }, console.log);
  }

  getFollowedUsersList() {
    self = this;
    getFollowedUsers((data) => {
      if (data.length) {
        var friendIdObject = {};
        data.forEach((friend) => {
          friendIdObject[friend.id] = friend.id;
        });
        self.setState({
          friendIdObject: friendIdObject
        });
      }
    }, console.log, Auth.getUserId());
  }

  componentDidMount() {
    this.getAllUsersList();
    this.getFollowedUsersList();
  }

  render() {
    if(this.state.usersToRender.length === 0){
     return (<div>
              <div>No Users to show</div></div>) 
    } else {
        return (
        <div>
          <UserNav links={navLinks}/>
          <div className='all-users-view'>
          {this.state.usersToRender.map((user, index) => {

            if (user.id in this.state.friendIdObject) {
              return (<UserEntry isFriend='true' user={user} key={index} friend_id={user.id}/>)
            } else {
              return (<UserEntry isFriend='false' user={user} key={index} friend_id={user.id}/>)
            }

          })
          }
          </div>
      </div>)
    }
  }
}


module.exports = ShowUsers;