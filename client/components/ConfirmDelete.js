import React, {PropTypes} from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
const forkUtil = require('../js/fork');

class ConfirmFork extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      isForked: false,
      forkInfo: {}
    }
    this.style = { borderRadius: 0 }
  }

  forkRepo () {
    forkUtil.forkRepo(function (data) {
      console.log('successfully forked repo: ' + JSON.stringify(data));
      this.setState({isForked: true, forkInfo: data});
    }.bind(this), console.error, this.props.data.org_name, this.props.data.name, this.props.username);
  }



  handleClick () { this.props.openModel() }
  handleClose () { this.props.closeModal() }
  handleFork(e) {
    e.preventDefault();
    this.forkRepo();
  }
  render() {
    return (<div onClick={this.handleClick}>
      {
        this.props.isShowing &&
        <ModalContainer onClose={this.handleClose.bind(this)}>
          <ModalDialog style={this.style} onClose={this.handleClose.bind(this)}>
            <h4>You're about to fork a repo!</h4>
            <div>this will make a fork on your GitHub account for you to start hacking on</div>
            <a className={"btn cyan" + (this.state.isForked ? " disabled" : "")} onClick={this.handleFork.bind(this)}><i className="octicon octicon-git-forked"></i>{this.state.isForked ? "Forked!" : "Fork It!"}</a>
            {this.state.isForked && <ForkInstructions data={this.props.data} forkInfo={this.state.forkInfo} />}
          </ModalDialog>
        </ModalContainer>
      }
    </div>);
  }      
}




module.exports = ConfirmDelete;