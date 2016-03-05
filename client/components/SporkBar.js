  const React = require('react');

  class SporkBar extends React.Component {

    constructor(props) {
      super(props);
    }

    showSporks (num, color) {
      var result = [];
      for (var i = 0; i < num; i++) {
        result.push(<span className="mega-octicon octicon-mark-github" style={{color: color}}></span>);
      }
      return result;
    }

    render () {
      return (
        <div>
          <div className="row" style={{border: '1px solid grey'}}>
            <div className="col s12 center-align blue-grey darken-3 z-depth-1" style={{'margin-bottom': '10px', padding: '5px'}}>
              <span className="white-text col s4 center-align">Forks: {this.props.forks  || 0}</span>
              <span className="white-text text-darken-1 col s4 center-align">Pulls: {this.props.pulls || 0}</span>
              <span className="white-text text-darken-1 col s4 center-align">Merges: {this.props.merges  || 0}</span>
            </div>
            <div className="col s12 left-align" style={{'margin-bottom': '10px'}}>
              <span className="col s1 center-align mega-octicon octicon-git-branch blue-grey-text"></span>
              <span className="col s11 fork-sporks">{this.showSporks(this.props.forks, '#965A38')}</span>

            </div>
            <div className="col s12 left-align" style={{'margin-bottom': '10px'}}>
              <span className="col s1 center-align mega-octicon octicon-git-pull-request blue-grey-text"></span>
              <span className="col s11 pull-sporks">{this.showSporks(this.props.pulls, '#A8A8A8')}</span>

            </div>
            <div className="col s12 left-align" style={{'margin-bottom': '10px'}}>
              <span className="col s1 center-align mega-octicon octicon-issue-closed blue-grey-text"></span>
              <span className="col s11 merge-sporks">{this.showSporks(this.props.merges, '#C98910')}</span>            
            </div>
          </div>
        </div>
      );
    }
  }


  module.exports = SporkBar;
