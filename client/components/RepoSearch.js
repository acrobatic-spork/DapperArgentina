const React = require('react');
const Repos = require('../js/repos');
// const $ = require('jquery');

class RepoSearch extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchText: null,
      currentLanguage: 'Javascript',
      languages: ['All', 'Javascript', 'Python', 'Java', 'Ruby', 'CSS'],
      sortBy:['default', 'Popularity', 'Tickets', 'Forks' ],
      currentSort: 'default'
    };
    
    this.searchHandler = this.searchHandler.bind(this);
    this.languageHandler = this.languageHandler.bind(this);
    this.languageDropDownClass = 'repo-language-dropdown';
  }

  languageHandler() {
    //The way this is invoked, we have no access to event details so we grab value usingjquery
    var newLanguage = this.grabSelectedLanguageVal();
    if(newLanguage === 'All') {
      newLanguage = null;
    }
    this.props.searchHandler(this.state.searchText, newLanguage);
    this.setState({
      currentLanguage: newLanguage
    });
  }

  setLanguages () {
    this.setState({
      languages: this.state.languages
    }, () =>  $(`.${this.languageDropDownClass}`).material_select(this.languageHandler));

  }

  componentDidMount() {
    // Use Materialize custom select input
    this.setLanguages();
    this.setSort();
  }

  searchHandler(e) {
    //If it is called by someone pressing enter, we run the searchHandler provided to use
    if (e.charCode === 13 || e.keyCode === 13) {
      this.props.searchHandler(e.target.value, this.state.language);
    }
    //In all cases we update our component state
    this.setState({
      searchText: e.target.value
    });
  }

  grabSelectedLanguageVal() {
    var $selected = $(`.${this.languageDropDownClass}`).find('.selected');
    return $selected[0].innerText.trim();
  }

  setSort () {
    $('.repo-sort-dropdown').material_select(this.handleSort.bind(this));
  }

  grabSelectedSortField() {
    var $selected = $('.repo-sort-dropdown').find('.selected');
    return $selected[0].innerText.trim();
  }

  handleSort(e){
    var newSort = this.grabSelectedSortField();
    this.setState({
      currentSort: newSort
    });
    this.props.searchHandler(this.state.searchText, this.state.language, newSort)
  }

  dummy (){
    //this doesn't actually get called because onChange doesn't work w/ the materialize select.
    //we just feed it in so React doesn't throw any errors
  }

  render () {
    return <div className="row">
            <div className="input-field col s6">
              <input type="text" value={this.state.searchText} 
                placeholder="search here..." onChange={this.searchHandler} onKeyPress={this.searchHandler} />
            </div>
            <div className="input-field col s3">
              <select className={this.languageDropDownClass} value={this.state.currentLanguage} onChange={this.dummy}>
                {this.state.languages.map((lang, index) => <option value={lang} key={lang}>{lang}</option>)}
              </select>
            </div>
            <div className="sort-field input-field col s3">
              <select className='repo-sort-dropdown' value={this.state.currentSort} onChange={this.dummy}>
                {this.state.sortBy.map((sortField, index) => <option value={sortField} key={sortField}>{sortField}</option>)}
              </select>
            </div>
          </div>;
  }
}

module.exports = RepoSearch;