const React = require('react'); 
const SporkBar = require('./SporkBar');
const FriendUtil = require('../js/friends');
const Auth = require('../js/auth');


class UserEntry extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      isFriend: null
    };
  }

  componentDidMount() {
    this.setState({
      isFriend: this.props.isFriend
    });
  }

  handleClick(e) {
    e.preventDefault();
    var self = this;
    if (this.props.isFriend) {
      FriendUtil.unfollowUser((data) => {
        console.log(data); 
        this.setState({
          isFriend: false
        });
      }, console.error, Number(Auth.getUserId()), Number(this.props.friend_id));
    } else {
      FriendUtil.followUser((data) => {
        console.log(data);
        this.setState({
          isFriend: true
        });
      }, console.error, Number(Auth.getUserId()), Number(this.props.friend_id));
    }
  }



  addBorder () {
    if (this.props.isFriend) {
      return '10px solid #00e676';
    } else {
      return '';
    }
  }

  friendButton () {
    if (this.props.isFriend) {
      return 'btn-floating btn-large waves-effect waves-light center-align blue';
    } else {
      return 'btn-floating btn-large waves-effect waves-light center-align red';
    }
  }

  render() {
    return (
      <div>
        <div className='card-panel hoverable'>
          <div className='row card-content'>
            <div className='col s3 center-align'>
              <img style={{border: this.addBorder() }} className='circle responsive-img' src={this.props.user.avatar_url} width='150px' />
              <span><h4><a href={this.props.user.html_url}>{this.props.user.name}</a></h4> </span>
            </div>
            <div className='col s7 center-align'>
              <SporkBar user={this.props.user}/>
              <a className={this.friendButton()} onClick={this.handleClick.bind(this)}><i className="material-icons">supervisor_account</i></a>
            </div>
            <div className='center-align col s2' style={{'border': '1px solid grey'}}>
              <h5>Spork Score</h5>
              <hr></hr>
              <h4>{this.props.user.num_forks + (this.props.user.num_pulls * 5) + (this.props.user.num_merges * 10)}</h4>
            </div>
          </div>
        </div>

      </div>
    )
  }
}


module.exports = UserEntry;
