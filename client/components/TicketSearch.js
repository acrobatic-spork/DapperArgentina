const React = require('react');
const Repos = require('../js/repos');

class TicketSearch extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchText: null,
      currentLanguage: 'All Languages',
      languages: [],
      currentSort: 'Most Recent'
    };
    
    this.searchHandler = this.searchHandler.bind(this);
    this.languageHandler = this.languageHandler.bind(this);
    this.languageDropDownClass = 'issue-language-dropdown';
  }

  languageHandler() {
    //The way this is invoked, we have no access to event details so we grab value usingjquery
    var newLanguage = this.grabSelectedLanguageVal();
    if (newLanguage === 'All Languages') {
      newLanguage = null;
    }
    this.props.searchHandler(this.state.searchText, newLanguage);
    this.setState({
      currentLanguage: newLanguage
    });
  }
  
  componentDidMount() { 
    // Use Materialize custom select input
   //$(`.${this.languageDropDownClass}`).material_select(this.languageHandler);
    this.setState({
      languages: this.props.searchLanguages
    }, () => $(`.${this.languageDropDownClass}`).material_select(this.languageHandler));
    this.setSort();
  }
  
  searchHandler(e) {
    //If it is called by someone pressing enter, we run the searchHandler provided to use
    if (e.charCode === 13 || e.keyCode === 13) {
      this.props.searchHandler(e.target.value, this.state.currentLanguage);
    }

    //In all cases we update our component state
    this.setState({
      searchText: e.target.value
    });
  }
  
  quickSearch(e) {
    this.props.quickSearch(e.target.value);
  }
  
  setSort () {
    $('.issue-sort-dropdown').material_select(this.handleSort.bind(this));
  }

  grabSelectedLanguageVal() {
    var $selected = $(`.${this.languageDropDownClass}`).find('.selected');
    return $selected[0].innerText.trim();
  }

  grabSelectedSortField() {
    var $selected = $('.issue-sort-dropdown').find('.selected');
    return $selected[0].innerText.trim();
  }

  handleSort(e) {
    var newSort = this.grabSelectedSortField();
    this.setState({
      currentSort: newSort
    });
    var lang = this.state.currentLanguage === 'All Languages' ? null : this.state.currentLanguage;
    this.props.searchHandler(this.state.searchText, lang, newSort);
  }
  
  render () {
    return (<div className="row">
              <div className="input-field col s8">
                <input type="text" value={this.state.searchText} onKeyUp={this.quickSearch.bind(this)}
                  placeholder="search here..." onChange={this.searchHandler} onKeyPress={this.searchHandler} />
              </div>
              <div className="input-field col s4">
                <select className={this.languageDropDownClass} value={this.state.currentLanguage} readOnly>
                  {this.state.languages.map((lang, index) => <option value={lang} key={lang}>{lang}</option>)}
                </select>
              </div>
           </div>);
  }
}

module.exports = TicketSearch;