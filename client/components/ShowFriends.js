const React = require('react');
const getFriends = require('../js/friends').getFriends;


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
    if(this.state.friendsToRender.length === 0) return (<div>No friends yet</div>)
    var FriendEntry = () => (
      <div>
        <img src={props.friend.avatar_url} width="50" />
        {props.friend.name} <br/> {props.friend.html_url} <br/>
      </div>)

    return (
    <div>
    <div class='all-friends-view'>
    {this.state.friendsToRender.map((friend, index) => {
      return (<FriendEntry friend={friend} key={index}/>)
      })
    }
    </div>
    </div>)

  }
}


module.exports = ShowFriends;