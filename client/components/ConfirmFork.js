import React, {PropTypes} from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
const forkUtil = require('../js/fork');
const Link = require('react-router').Link;
const SmallLoader = require('./SmallLoader');


const ForkInstructions = (props) => (
  <ul className="collection">
    <li className="collection-item">
      <strong>Clone (copy) the repo by opening the terminal and running</strong>
      <pre><code>git clone https://github.com/{props.forkInfo.username}/{props.data.name}.git</code></pre>
    </li>
    <li className="collection-item">
      <strong>Add the original repo as an upstream remote</strong>
      In the repo's main directory, run:
      <pre><code>git remote add upstream https://github.com/{props.forkInfo.org_name}/{props.data.name}.git</code></pre>
    </li>
    <li className="collection-item">
      <div className="row">
      <h5><Link className="left cyan-text" to="/resources"><i className="material-icons">stars</i>Follow the next steps and best practices in our guide</Link></h5>
      </div>
    </li>
  </ul>
);




class ConfirmFork extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      isForked: false,
      forkError: false,
      forkInfo: {},
      loading:false
    }
    this.style = { borderRadius: 0 }
  }

  forkRepo () {
    forkUtil.forkRepo(function (data) {
      // console.log('successfully forked repo: ' + JSON.stringify(data));
      this.setState({isForked: true, forkInfo: data, loading:false});
      this.props.refreshUserInfo();
    }.bind(this), 
    function (data) {
      this.setState({isForked: false, forkError: true, loading:false});
      this.props.refreshUserInfo();
    }.bind(this),
    this.props.data.org_name, this.props.data.name, this.props.username);
  }





  handleClick () { this.props.openModel() }
  handleClose () { this.props.closeModal() }
  handleFork(e) {
    e.preventDefault();
    this.setState({
      loading:true
    });
    this.forkRepo();
  }
  render() {
    return (<div onClick={this.handleClick}>
      {
        this.props.isShowing &&
        <ModalContainer onClose={this.handleClose.bind(this)}>
          <ModalDialog style={this.style} onClose={this.handleClose.bind(this)}>
          { this.state.forkError && <span className="red-text error">Hmm, that didn't work. Have you already sporked this one?</span> }
            { !this.state.isForked && [
              <h4>You're about to fork a repo!</h4>,
              <div>this will make a fork on your GitHub account for you to start hacking on</div>
            ]}
            <a className={"btn cyan" + (this.state.isForked ? " disabled" : "")} onClick={this.handleFork.bind(this)}><i className="octicon octicon-git-forked"></i>{this.state.isForked ? "Forked!" : "Fork It!"}</a>
            {this.state.isForked && [
              <span className="cyan-text inline-title">Okay, now what?</span>,
              <ForkInstructions data={this.props.data} forkInfo={this.state.forkInfo} />
              ]}
              {this.state.loading && <div className=" col s2 right-align right"><SmallLoader style={{width:"2.5em", "margin-top":"1em"}}/></div> }
          </ModalDialog>
        </ModalContainer>
      }
    </div>);
  }      
}




module.exports = ConfirmFork;