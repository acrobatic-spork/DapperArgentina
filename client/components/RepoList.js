const React = require('react');
const RepoSearch = require('./RepoSearch');
const RepoEntry = require('./RepoEntry');
const Repos = require('../js/repos');
const LoadingAnimation = require('./LoadingAnimation');

class RepoList extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      reposToRender: [],
      sortedBy: 'default',
      loading: true
    };
    
    this.getRepos = this.getRepos.bind(this);
    
  }
  
  getRepos(searchTerm, language, filterBy){
    //Fetch repos;
    var self = this;
    Repos.getRepos(function(data) {
      if(filterBy){
        switch(filterBy){
          case 'Popularity':
            data = data.sort((a,b) => b.stargazers_count-a.stargazers_count);
            break;
          case 'Tickets':
            data = data.sort((a,b) => b.beginner_tickets-a.beginner_tickets);
            break;
          case 'Forks':
            data = data.sort((a,b) => b.forks-a.forks);
            break;
        }
        self.setState({sortedBy: filterBy})
      }
      self.setState({
        numberOfRepos: data.length,
        reposToRender: data.slice(0,199),
        loading:false
      });
    }, console.log, searchTerm, language);
  }

  quickSearch(searchTerm){
    if(searchTerm){
      var repos = this.state.reposToRender.filter((repo)=> {
        return ( (repo.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
                 (repo.org_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
                );
      })
    this.setState({
      reposToRender: repos,
      numberOfRepos: repos.length
    });
    } else {
      this.getRepos();
    }
  }

  componentDidUpdate () {
    //Anytime the component renders, scroll to the top of the repo list
    $('.main-repo-view')[0].scrollTop = 0;
  }
  
  componentDidMount () {
    this.getRepos();
  }
  
  render () {
    
    //for really clean scrolling, we could do something like below to calculate the max height and then set the max height css 
    // var maxHeight = $(window).height() - $('.navbar').outerHeight() - margin * 2;
    
    return (
    <div >
      <RepoSearch quickSearch={this.quickSearch.bind(this)} searchHandler={this.getRepos} />
      <h4>{this.state.numberOfRepos} Repos with easy issues - sorted by {this.state.sortedBy.toLowerCase()}</h4>
      <div className="main-repo-view">
        {this.state.reposToRender.map ((repo, index) => 
          <RepoEntry data={repo} username={this.props.username} key={index} refreshUserInfo={this.props.refreshUserInfo} />
        )}
        {this.state.loading && <LoadingAnimation /> }
      </div>
    </div>
    );  
  }
  
}

module.exports = RepoList;