const React = require('react'); 
const SporkBar = require('./SporkBar');
const FriendUtil = require('../js/friends');
const Auth = require('../js/auth');


class UserEntry extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      isFriend: this.props.isFriend,
      imgBorder: '',
      buttonColor: ''
    };
  }

  setFriend(isFriend) {
    if (isFriend) {
      this.setState({
        isFriend: true,
        imgBorder: '10px solid #00e676',
        buttonColor: 'red-text text-lighten-2'
      });
    } else {
      this.setState({
        isFriend: false,
        imgBorder: '',
        buttonColor: 'green-text text-accent-3'
      });
    }
  }

  componentDidMount() {
    this.setFriend(this.props.isFriend);
  }


  handleClick(e) {
    e.preventDefault();
    if (this.state.isFriend) {
      FriendUtil.unfollowUser(() => {
        this.setFriend(false);     
      }, console.error, Number(Auth.getUserId()), Number(this.props.friend_id));
    } else {
      FriendUtil.followUser(() => {
        this.setFriend(true);
      }, console.error, Number(Auth.getUserId()), Number(this.props.friend_id));
    }
  }


  render() {
    return (
      <div>
        <div className='card-panel hoverable'>
          <div className='row card-content'>
            <div className='col s3 center-align'>
              <img style={{border: this.state.imgBorder }} className='circle responsive-img' src={this.props.user.avatar_url} width='150px' />
              <span><h4><a href={this.props.user.html_url}>{this.props.user.name}</a></h4> </span>
            </div>
            <div className='col s7 center-align'>
              <SporkBar user={this.props.user}/>
            </div>
            <div className='center-align col s2'>
              <div style={{'border': '1px solid grey'}}>
                <h5>Spork Score</h5>
                <hr></hr>
                <h4>{this.props.user.num_forks + (this.props.user.num_pulls * 5) + (this.props.user.num_merges * 10)}</h4>
              </div>
              <div className="follow-button">
                <div className={'clickable ' + this.state.buttonColor} onClick={this.handleClick.bind(this)}>
                  <i className="material-icons">{this.state.isFriend ? 'sentiment_very_dissatisfied' : 'person_add'}</i>
                  <span>{this.state.isFriend ? ' unfollow' : ' follow'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


module.exports = UserEntry;
