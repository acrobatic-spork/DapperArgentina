const React = require('react');

class ShortInstruct extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      hidden: false,
      showClass: ''
    };

  }

  toggleHide (e) {
    e.preventDefault();
    if(this.state.hidden) {
      this.setState({
        hidden: false,
        showClass: ''
      }); 
    } else {
      this.setState({
        hidden: true,
        showClass: 'hide'
      });
    }
  }

  render() {
    return (
      <div className={"row " + this.state.showClass}>
        <div className="col s12 m12">
          <div className="card white">
            <div className="card-content black-text">
              <span className="card-title"><strong>How to Contribute</strong></span>
              <div className="col s2 right right-align">
                <a href="#" className="hide-button" onClick={this.toggleHide.bind(this)}>
                  <span className="mega-octicon octicon-x"></span>
                </a>
              </div>
              <p>Clone (copy) the repo by opening the terminal and running</p> <pre>git clone "link to your forked repo"</pre>
              <p>The link depends on the repo, and can be found on GitHub.</p>
              <h5>Add the original repo as an upstream remote</h5>
              <p>In the repo's main directory, run:</p> <pre>git remote add upstream "link to the original repo"</pre>
              <p><strong>Make changes and commit!</strong></p>
            </div>
            <div className="card-action">
              <a className="cyan-text lighten-2 cyan-text lighten-2" href="/resources">Visit our Getting Started page for more details</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

module.exports = ShortInstruct;
