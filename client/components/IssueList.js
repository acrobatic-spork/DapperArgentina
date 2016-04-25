const React = require('react');
const IssueSearch = require('./IssueSearch');
const IssueEntry = require('./IssueEntry');
const Issues = require('../js/issues');
const LoadingAnimation = require('./LoadingAnimation');

class IssueList extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      numberOfTickets: 0,
      ticketsToRender: null, 
      currentSort: 'Most Recent'
    };
    
    this.getIssues = this.getIssues.bind(this);
  }
  
  getIssues(searchTerm, language) {
    //Fetch issues;
    var self = this;

    Issues.getIssues(function(data) {
      self.setState({
        numberOfTickets: data.length,
        ticketsToRender: data.slice(0, 199)
      });
    }, console.log, searchTerm, language);
  }

  quickSearch(searchTerm) {
    if (searchTerm) {
      var issues = this.state.ticketsToRender.filter((issue)=> {
        return ( (issue.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
                          (issue.org_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
                            (issue.repo_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
                        ); 
      });
      this.setState({
        ticketsToRender: issues,
        numberOfTickets: issues.length
      });
    } else {
      this.getIssues();
    }
  }

  componentDidMount () {
    this.getIssues();
  }
  componentDidUpdate () {    
    //Anytime the component renders, scroll to the top of the issue list
    $('.main-ticket-view')[0].scrollTop = 0;
  }
  render () {
    return (
    <div>
      <IssueSearch quickSearch={this.quickSearch.bind(this)} searchHandler={this.getIssues} searchLanguages={this.props.searchLanguages}/>
      <h4>{this.state.numberOfTickets} Easy issues found - sorted by {this.state.currentSort.toLowerCase()}</h4>
      <div className="main-ticket-view">
          { (this.state.ticketsToRender === null) ? <LoadingAnimation /> :
            this.state.ticketsToRender.map ((ticket, index) => (
              <IssueEntry data={ticket} username={this.props.username} refreshUserInfo={this.props.refreshUserInfo} key={index} />
            )
          )
          }
      </div>
    </div>
    );  
  }
  
}

module.exports = IssueList;