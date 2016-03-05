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
    console.log("Calling addFriend in Confirm with friend id: ", this.props.friend_id);
    FriendUtil.addFriend( function(res) {
      console.log("We got a response!"); 
      this.props.closeModal();
      }, 
      function(err) {
        console.error(err);
      }, Number(Auth.getUserId()), Number(this.props.friend_id) );     
  }

  render() {
    return (<div onClick={this.handleClick}>
      {
        this.props.isShowing &&
        <ModalContainer onClose={this.props.closeModal.bind(this)}>
          <ModalDialog style={this.style} onClose={this.props.closeModal.bind(this)}>
            <h5>Are you sure you want to add this user as a friend?</h5>
            <a className="btn cyan" onClick={this.addFriend.bind(this)}>Add Friend!</a>
          </ModalDialog>
        </ModalContainer>
      }
    </div>);
  }      
}

module.exports = ConfirmFriend;