import React, {PropTypes} from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';

class ConfirmFork extends React.Component {

  constructor (props) {
    super(props);
  }

  handleClick () { this.props.openModel() }
  handleClose () { this.props.closeModal() }
  render() {
    return (<div onClick={this.handleClick}>
      {
        this.props.isShowing &&
        <ModalContainer onClose={this.handleClose.bind(this)}>
          <ModalDialog onClose={this.handleClose.bind(this)}>
            <h4>You're about to fork a repo!</h4>
            <p>Clone (copy) the repo by opening the terminal and running</p> <pre>git clone "link to your forked repo"</pre>
            <p>The link depends on the repo, and can be found on GitHub.</p>
            <p>Add the original repo as an upstream remote</p>
            <p>In the repo's main directory, run:</p> <pre>git remote add upstream "link to the original repo"</pre>
            <p><strong>Make changes and commit!</strong></p>

            <a className="cyan-text lighten-2 cyan-text lighten-2" href="/resources">Visit our Getting Started page for more details</a>
          </ModalDialog>
        </ModalContainer>
      }
    </div>);
  }      
}


module.exports = ConfirmFork;