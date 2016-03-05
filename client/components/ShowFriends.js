const React = require('react');
const getFriends = require('../js/friends').getFriends;
const UserNav = require('./UserNav');
const Auth = require('../js/auth');

const navLinks = [
  {
    name: "Users / Add Users", url: '/users'
  },
  {
    name: "Friends", url: '/friends'
  }
];

const ShowFriends = class ShowFriends extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      friendsToRender: []
    }
  }

  getAllFriendsList() {
    self = this;
    getFriends((data) => {
      console.log('In get all friends', data)
      if(data.length){
        self.setState({
          friendsToRender: data
        });
      }
    }, console.log, Auth.getUserId());
  }

  componentDidMount(){
    this.getAllFriendsList();
  }

  render() {
    var self = this;
    if(this.state.friendsToRender.length === 0) return (
      <div>
        <UserNav links={navLinks}/>
        <h2>No friends yet. Add some friends <a href='/#/users'>here</a></h2>
      </div>)
    else {
      var FriendEntry = ({friend}) => (
        <div className='card-panel'>
        <div className='card-content'>
          <img className='circle' src={friend.avatar_url} width='100px'/>
          <span><h4>{friend.name}</h4> </span>
          <span>Forks {friend.num_forks} </span>
          <span>Pulls {friend.num_pulls} </span>
          <span>Merges {friend.num_merges} </span> 
        </div>
        </div>)

      return (
      <div>
      <UserNav links={navLinks}/>
      <div class='all-friends-view'>
      {this.state.friendsToRender.map((friend, index) => {
        return (<FriendEntry friend={friend} key={index}/>)
        })
      }
      </div>
      </div>)   
    }
  }
}


module.exports = ShowFriends;