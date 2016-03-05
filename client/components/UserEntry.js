const React = require('react');
const ConfirmFriend = require('./ConfirmFriend'); 

class UserEntry extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      showConfirm: false
    }
  }

  handleClick(e) {
    e.preventDefault();
    this.openConfirm();
  }

  openConfirm () {
    this.setState({
      showConfirm: true
    });
  }

  closeConfirm () {
    this.setState({
      showConfirm: false
    });
  }

  render() {
    return (
      <div>
        <ConfirmFriend isShowing={this.state.showConfirm} openModal={this.openConfirm.bind(this)} closeModal={this.closeConfirm.bind(this)} friend_id={this.props.friend_id} />
        <div onClick={this.handleClick.bind(this)} className='card-panel hoverable'>
          <div className='card-content'>
            <img className='circle responsive-img' src={this.props.user.avatar_url} width='100px'  />
            <span><h4>{this.props.user.name}</h4> </span> 
            <span>Forks {this.props.user.num_forks}</span>
            <span>Pulls {this.props.user.num_pulls}</span>
            <span>Merges {this.props.user.num_merges}</span>
            <p>
            Github: <a href={this.props.user.html_url}>See @{this.props.user.username} at Github</a>
            </p>
          </div>
        </div>

      </div>
    )
  }
}

module.exports = UserEntry