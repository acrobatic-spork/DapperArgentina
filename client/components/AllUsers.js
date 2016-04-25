const React = require('react');
const getUsers = require('../js/users').getUsers;
const UserEntry = require('./UserEntry');
const UserNav = require('./UserNav');
const followUser = require('../js/friends').followUser;
const getFollowedUsers = require('../js/friends').getFollowedUsers;
const navLinks = require('./NavLinks');
const Auth = require('../js/auth');
const LoadingAnimation = require('./LoadingAnimation');

class AllUsers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      usersToRender: null,
      friendIdObject: {}
    };
  }

  getAllUsersList() {
    var self = this;
    getUsers((data) => {
      if (data.length) {
        var usersToRender = data.filter((user) => {
          return user.username !== this.props.username;
        });
        if (!Array.isArray(usersToRender)) {
          usersToRender = [usersToRender];
        }
        self.setState({
          usersToRender
        });
      }
    }, console.log);
  }

  getFollowedUsersList() {
    var self = this;
    var friendIdObject = {};
    getFollowedUsers((data) => {
      if (data.length) {
        data.forEach((friend) => {
          friendIdObject[friend.id] = friend.id;
        });
        this.setState({
          friendIdObject
        });
      }
    }, console.log, Auth.getUserId());
  }

  componentDidMount() {
    this.getAllUsersList();
    this.getFollowedUsersList();
  }

  render() {
    if (this.state.usersToRender === null) {
      return (<LoadingAnimation />);
    } else if (this.state.usersToRender.length === 0) {
      return (<div>No Users to show</div>);
    } else {
      return (
        <div>
          <UserNav links={navLinks}/>
          <div className='all-users-view'>
          {this.state.usersToRender.map((user, index) => {
            if (user.id in this.state.friendIdObject) {
              return (<UserEntry isFriend={true} user={user} key={index} friend_id={user.id}/>);
            } else {
              return (<UserEntry isFriend={false} user={user} key={index} friend_id={user.id}/>);
            }
          })}
          </div>
        </div>);
    }
  }
}


module.exports = AllUsers;
