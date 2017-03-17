const React = require('react');
const { connect } = require('react-redux');
const IssueSearch = require('./IssueSearch');
const IssueEntry = require('./IssueEntry');
const Issues = require('../js/issues');
const LoadingAnimation = require('./LoadingAnimation');
const { getIssues } = require('../actions');

class IssueList extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      currentSort: 'Most Recent',
      loading: this.props.fetching
    };
    
    this.getIssues = this.getIssues.bind(this);
  }
  
  getIssues(searchTerm, language) {
    if (!this.props.issues.length) {
      this.props.getIssues(searchTerm, language);
    }
  }

  quickSearch(searchTerm) {
    if (searchTerm) {
      var issues = this.state.issuesToRender.filter((issue)=> {
        return ( (issue.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
                          (issue.org_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
                            (issue.repo_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
                        ); 
      });
      this.setState({
        issuesToRender: issues,
        numberOfIssues: issues.length
      });
    } else {
      this.getIssues();
    }
  }

  componentDidMount () {
    this.props.getIssues();
  }
  componentDidUpdate () {    
    //Anytime the component renders, scroll to the top of the issue list
    $('.main-ticket-view')[0].scrollTop = 0;
  }

  componentWillReceiveProps(nextProps) {
    if (typeof(nextProps.fetching) === 'boolean') {
      this.setState({loading: nextProps.fetching});
    }
  }

  renderIssues() {
    return (
      <div>
        <h4>{this.props.issues.length} Easy issues found - sorted by {this.state.currentSort.toLowerCase()}</h4>
        {this.props.issues.map(issue => (
          <IssueEntry data={issue} username={this.props.username} refreshUserInfo={this.props.refreshUserInfo} key={issue.id + issue.title} />
        ))}
      </div>
    );
  }

  render () {
    return (
    <div>
      <IssueSearch quickSearch={this.quickSearch.bind(this)} searchHandler={this.getIssues} searchLanguages={this.props.searchLanguages}/>
      <div className="main-ticket-view">
        {this.state.loading ? <LoadingAnimation /> : this.renderIssues()}
      </div>
    </div>
    );  
  }
  
}

const mapStateToProps = function(state) {
  return {
    issues: state.issues.list,
    fetching: state.issues.fetching,
  };
};

module.exports = connect(mapStateToProps, { getIssues })(IssueList);