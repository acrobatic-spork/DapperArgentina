const React = require('react');
const getFriends = require('../js/friends').getFriends;
const UserNav = require('./UserNav');
const Auth = require('../js/auth');
const navLinks = require('./NavLinks');

const SporkBar = require('./SporkBar');


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
    if(this.state.friendsToRender.length === 0) return (
      <div>
        <UserNav links={navLinks}/>
        <h2>No friends yet. Add some friends <a href='/#/users'>here</a></h2>
      </div>)
    else {
      var FriendEntry = ({friend}) => (
        <div className='card-panel'>
          <div className='row card-content'>
            <div className='col s3 center-align'>
              <img className='circle responsive-img' src={friend.avatar_url} width='100px'  />
              <span><h4><span className="mega-octicon octicon-verified yellow-text text-accent-2"></span><a href={friend.html_url}>{friend.name}</a></h4> </span>
            </div>
            <div className='col s6'>
              <SporkBar user={friend}/>
            </div>
            <div className='center-align col s3' style={{'border': '1px solid grey'}}>
              <h5>Spork Score</h5>
              <hr></hr>
              <h4>{friend.num_forks+(friend.num_pulls*5)+(friend.num_merges*10)}</h4>
            </div>
          </div>
        </div>)

      return (
      <div>
      <UserNav links={navLinks}/>
      <div className='all-friends-view'>
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