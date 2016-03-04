import React from 'react';
const GitInstruct = require('./GitHubInstructions');
const Guides = require('./Guides');


class ResourceList extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      showConfirm: false
    }
  }

  componentDidMount() {
    $('.collapsible').collapsible();
  }

  render () {
    return (
      <div className="row"> 
        <div className="col s12 m12">
          <h4>Getting Started</h4>
          <blockquote>
          Want to contribute to open source projects on GitHub, but unsure where to start? You've come to the right place!
          We comb through active repos to find the easy issues that beginners can handle. Still not ready to dive in? Check out these guides:
          </blockquote>
          <ul className="collapsible popout" data-collapsible="accordion">
            <li>
              <div className="collapsible-header active"><i className="material-icons">stars</i><strong>How to Play</strong></div>
                <div className="collapsible-body"><GitInstruct /></div>
            </li>
            <li>
              <div className="collapsible-header"><i className="octicon octicon-repo"></i><strong>Strategy Guides</strong></div>
                <div className="collapsible-body"><Guides /></div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

module.exports = ResourceList;