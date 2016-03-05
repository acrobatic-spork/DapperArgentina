import React, {PropTypes} from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
const Auth = require('../js/auth');
const FriendUtil = require('../js/friends');


class ConfirmFriend extends React.Component {

  constructor (props) {
    super(props);
    this.style = { borderRadius: 0 }
  }


  addFriend (e) {
    e.preventDefault();
    FriendUtil.addFriend(console.log, console.error, Number(Auth.getUserId()), Number(this.props.friend_id));     
      this.props.closeModal();
  }

  render() {
    return (<div onClick={this.handleClick}>
      {
        this.props.isShowing &&
        <ModalContainer onClose={this.props.closeModal.bind(this)}>
          <ModalDialog style={this.style} onClose={this.props.closeModal.bind(this)}>
            <br />
            <p>Are you sure you want to add this user as a friend?</p>
            <a className="waves-effect waves-light btn cyan" onClick={this.addFriend.bind(this)}>Add Friend!</a>
            <span> </span>
            <a className="waves-effect waves-light btn red lighten-2" onClick={this.props.closeModal}>Cancel</a>
          </ModalDialog>
        </ModalContainer>
      }
    </div>);
  }      
}

module.exports = ConfirmFriend;