const React = require('react');
const getFriends = require('../js/friends').getFriends;
const UserNav = require('./UserNav');

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
      if(data.length){
        self.setState({
          friendsToRender: data
        });
      }
    }, console.log);
  }

  componentDidMount(){
    this.getAllFriendsList();
  }

  render() {
    if(this.state.friendsToRender.length === 0) return (
      <div>
        <UserNav links={navLinks}/>
        <h2>No friends yet. Add some friends <a href='/#/users'>here</a></h2>
      </div>)
    else {
      var FriendEntry = () => (
        <div className='card-content'>
          <img src={props.friend.avatar_url} />
          {props.friend.name} <br/> {props.friend.html_url} <br/>
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