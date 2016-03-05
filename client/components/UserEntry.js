const React = require('react');
const ConfirmFriend = require('./ConfirmFriend'); 
const SporkBar = require('./SporkBar');


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

  addBorder () {
    if(this.props.isFriend === 'true') {
      return '10px solid #ffff00'
    } else {
      return '';
    }
  }

  friendButton () {
    if(this.props.isFriend === 'true') {
      return 'btn-floating btn-large waves-effect waves-light red disabled center-align'
    } else {
      return 'btn-floating btn-large waves-effect waves-light red center-align';
    }
  }
  dummy(){

  }

  render() {
    return (
      <div>
        <ConfirmFriend isShowing={this.state.showConfirm} closeModal={this.closeConfirm.bind(this)} friend_id={this.props.friend_id} />
        <div className='card-panel hoverable'>
          <div className='row card-content'>
            <div className='col s3 center-align'>
              <img style={{border: this.addBorder() }} className='circle responsive-img' src={this.props.user.avatar_url} width='150px' />
              <span><h4><a href={this.props.user.html_url}>{this.props.user.name}</a></h4> </span>
            </div>
            <div className='col s7 center-align'>
              <SporkBar user={this.props.user}/>
              <a className={this.friendButton()} onClick={this.props.isFriend === 'false' ? this.handleClick.bind(this) : this.dummy}><i className="material-icons">supervisor_account</i></a>
            </div>
            <div className='center-align col s2' style={{'border': '1px solid grey'}}>
              <h5>Spork Score</h5>
              <hr></hr>
              <h4>{this.props.user.num_forks+(this.props.user.num_pulls*5)+(this.props.user.num_merges*10)}</h4>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

module.exports = UserEntry
