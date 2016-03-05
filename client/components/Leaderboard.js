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
              <div className='card-panel'>
                <div className='row card-content valign-wrapper center-align'>
                  <div className='col s9'>
                    <div className='col s5 valign'>
                      <span className='title'><h3>{index}</h3></span>
                      <hr></hr>
                      <span className='title'><h3>{user.name}</h3></span>
                    </div>
                    <div className='center-align col s7 valign' style={{'max-width': '200px'}}>
                      <img className='center-align circle responsive-img' src={user.avatar_url}/>
                    </div>
                  </div>
                  <div className='center-align col s3' style={{'border': '1px solid grey'}}>
                    <h5>Spork Score</h5>
                    <hr></hr>
                    <h4>{user.userPoints}</h4>
                  </div>
                </div>
              </div>
              )
            })
          }
          </ul>
      </div>)
    }
  }
}


module.exports = Leaderboard;