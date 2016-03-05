import React, {PropTypes} from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
const forkUtil = require('../js/fork');

const DeleteInstructions = (props) => (
  <div>
    <h5>To delete the fork on GitHub:</h5>
    <ol>
      <li>In your repos page on GitHub, click on the link for {props.data.name}</li>
      <li>Click on <span class="octicon octicon-gear"></span> Settings at the top of the page</li>
      <li>Scroll down to the Danger Zone</li>
      <li>Click the scary Delete this Repository button. Type in the repo name, confirm it, and you're done!</li>
    </lo>
  </div>
);

class ConfirmDelete extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      deleted: false
    }
    this.style = { borderRadius: 0 }
  }

  deleteFork () {
    forkUtil.deleteFork(function () {
      console.log('successfully deleted repo!');
      this.setState({deleted: true});
    }.bind(this), console.error, this.props.data.org_name, this.props.data.name, this.props.username);
  }

  handleClick () { this.props.openModel() }
  handleClose () { this.props.closeModal() }
  handleDelete(e) {
    e.preventDefault();
    this.deleteFork();
  }

  render() {
    return (<div onClick={this.handleClick}>
      {
        this.props.isShowing &&
        <ModalContainer onClose={this.handleClose.bind(this)}>
          <ModalDialog style={this.style} onClose={this.handleClose.bind(this)}>
            <h4>Are you sure you want to delete this repo?</h4>
            <div>If you delete the repo here, it will still be forked on GitHub.</div>
            <a className={"btn cyan" + (this.state.deleted ? " disabled" : "")} onClick={this.handleFork.bind(this)}><i className="octicon octicon-git-forked"></i>{this.state.deleted ? "Repo Deleted" : "Delete It!"}</a>
            {this.state.deleted && <DeleteInstructions data={this.props.data} />}
          </ModalDialog>
        </ModalContainer>
      }
    </div>);
  }      
}




module.exports = ConfirmDelete;