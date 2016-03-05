const React = require('react');
const Auth = require('../js/auth');
const getUsers = require('../js/users').getUsers;
const UserEntry = require('./UserEntry');
const UserNav = require('./UserNav');
const {browserHistory} = require('react-router');
const navLinks = require('./NavLinks');

const SporkSvg = require('./SporkSvg')

const Leaderboard = class Leaderboard extends React.Component {
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
        data = data.map((user, index) => {
          user.userPoints = 0
          user.userPoints += ((user.num_forks *  1) + (user.num_pulls * 5) + (user.num_merges * 10))
          return user;
        });
        data = data.sort((a, b) => b.userPoints > a.userPoints);
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
              <h3>No Users in the Leaderboard</h3></div>) 
    } else {
      console.log('about to render');
        return (
        <div>
          <UserNav links={navLinks}/>
          <ul className='collection'>
          {this.state.usersToRender.map((user, index) => {
            return (
                <li className='collection-item avatar'>
<<<<<<< HEAD
                  <img className='circle responsive-img' style={{float:'left'}} src={user.avatar_url}/>
                  <span className='title'><h3>{index}. {user.name} </h3></span>
                  <p>Points: {user.userPoints}</p>
=======
                  <span><img className='circle responsive-img' style={{float:'left'}} src={user.avatar_url}/></span>
                  <span className='title'><h3>{index}. {user.name} </h3></span>
                  <div style={{width:'30px'}}><SporkSvg/>Points: {user.userPoints}</div>
>>>>>>> 222b604c3a6ade7bdd338adcdfbc8ee8e99bf653
                </li>
              )
            })
          }
          </ul>
      </div>)
    }
  }
}


module.exports = Leaderboard;