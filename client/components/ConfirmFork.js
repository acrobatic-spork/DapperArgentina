import React, {PropTypes} from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
const forkUtil = require('../js/fork');


const ForkInstructions = (props) => (
  <div>
    <p>Clone (copy) the repo by opening the terminal and running</p>
    <pre><code>git clone https://github.com/{props.forkInfo.username}/{props.data.name}.git</code></pre>
    <p>The link depends on the repo, and can be found on GitHub.</p>
    <p>Add the original repo as an upstream remote</p>
    <p>In the repo's main directory, run:</p>
    <pre><code>git remote add upstream https://github.com/{props.forkInfo.org_name}/{props.data.name}.git</code></pre>
    <p><strong>Make changes and commit!</strong></p>

    <a className="cyan-text lighten-2 cyan-text lighten-2" href="/resources">Visit our Getting Started page for more details</a>
  </div>
);




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
      this.props.refreshUserInfo();
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




module.exports = ConfirmFork;