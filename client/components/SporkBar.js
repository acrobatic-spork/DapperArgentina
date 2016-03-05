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
            <div className="col s12 left-align" style={{'margin-bottom': '10px'}}>
              <span className="col s1 center-align mega-octicon octicon-git-branch blue-grey-text"></span>
              <span className="col s11 fork-sporks">{this.showSporks(this.props.user.num_forks, '#965A38')}</span>
            </div>
            <div className="col s12 left-align" style={{'margin-bottom': '10px'}}>
              <span className="col s1 center-align mega-octicon octicon-git-pull-request blue-grey-text"></span>
              <span className="col s11 pull-sporks">{this.showSporks(this.props.user.num_pulls, '#A8A8A8')}</span>

            </div>
            <div className="col s12 left-align" style={{'margin-bottom': '10px'}}>
              <span className="col s1 center-align mega-octicon octicon-issue-closed blue-grey-text"></span>
              <span className="col s11 merge-sporks">{this.showSporks(this.props.user.num_merges, '#C98910')}</span>            
            </div>
        </div>
      );
    }
  }


  module.exports = SporkBar;
