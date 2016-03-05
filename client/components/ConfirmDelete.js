import React, {PropTypes} from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
const forkUtil = require('../js/fork');

const DeleteInstructions = (props) => (
  <div>
    <h5>To delete the fork on GitHub:</h5>
    <ol>
      <li>In your repos page on GitHub, click on the link for the repo you want to delete.</li>
      <li>Click on <span className="octicon octicon-gear"></span> Settings at the top of the page</li>
      <li>Scroll down to the Danger Zone</li>
      <li>Click the scary Delete this Repository button. Type in the repo name, confirm it, and you're done!</li>
    </ol>
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
      this.props.refreshUserInfo();
    }.bind(this), console.error, this.props.username, this.props.data.id);
  }

  handleDelete(e) {
    e.preventDefault();
    this.deleteFork();
  }

  render() {
    return (<div>
      {
        this.props.isShowing &&
        <ModalContainer onClose={this.props.closeModal.bind(this)}>
          <ModalDialog style={this.style} onClose={this.props.closeModal.bind(this)}>
            <h4>Are you sure you want to delete this repo?</h4>
            <div>If you delete the repo here, it will still be forked on GitHub.</div>
            <a className={"btn cyan" + (this.state.deleted ? " disabled" : "")} onClick={this.deleteFork.bind(this)}><i className="octicon octicon-git-forked"></i>{this.state.deleted ? "Repo Deleted" : "Delete It!"}</a>
            {this.state.deleted && <DeleteInstructions data={this.props.data} username={this.props.username} />}
          </ModalDialog>
        </ModalContainer>
      }
    </div>);
  }      
}

module.exports = ConfirmDelete;