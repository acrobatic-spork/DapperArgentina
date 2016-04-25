const React = require('react');
const getFriends = require('../js/friends').getFollowedUsers;
const UserNav = require('./UserNav');
const Auth = require('../js/auth');
const navLinks = require('./NavLinks');

const SporkBar = require('./SporkBar');

const FriendEntry = (props) => (
  <div className='card-panel'>
    <div className='row card-content'>
      <div className='col s3 center-align'>
        <img className='circle responsive-img' src={props.friend.avatar_url} width='100px' />
        <span><h4><a href={props.friend.html_url}>{props.friend.name}</a></h4> </span>
      </div>
      <div className='col s6'>
        <SporkBar user={props.friend}/>
      </div>
      <div className='center-align col s3' style={{'border': '1px solid grey'}}>
        <h5>Spork Score</h5>
        <hr></hr>
        <h4>{props.friend.num_forks + (props.friend.num_pulls * 5) + (props.friend.num_merges * 10)}</h4>
      </div>
    </div>
  </div> 
);

class Following extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      friendsToRender: []
    };
  }

  componentDidMount() {
    var userId = Auth.getUserId();
    var self = this;
    getFriends((data) => {
      if (data.length) {
        var friendsData = data.filter((user) => {
          return user.username !== this.props.username;
        });
        if (!Array.isArray(friendsData)) {
          friendsData = [friendsData];
        }
        self.setState({
          friendsToRender: friendsData
        });
      }
    }, console.error, userId);
  }

  render() { 
    if (this.state.friendsToRender.length) {
      return (
        <div>
          <UserNav links={navLinks}/>
          <div className='all-friends-view'>
          {
            this.state.friendsToRender.map((friend, index) => {
              return (<FriendEntry friend={friend} key={index} />);
            })
          }
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <UserNav links={navLinks}/>
          <h3>You're not following anyone yet. Follow other sporkers <a href='/users'>here</a></h3>
        </div>
      );   
    }
  }
}


module.exports = Following;
