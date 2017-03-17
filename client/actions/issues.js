import merge from 'lodash/merge';
import axios from 'axios';
// import Promise from 'bluebird';

import {
  FETCH_ISSUES,
  FETCH_ISSUES_FULFILLED,
  FETCH_ISSUES_REJECTED,
  RECIEVE_ISSUES,
  SET_ISSUE
} from '../actions/types';

import config from '../../config';

const beginnerLabels = [
  'good first bug',
  'beginner',
  'easy',
  'easyfix',
  'good-first-pr',
  'good-first-issue',
  'first-timers-only',
  'easy pick'
];

/**Basic gitHub request information that we want to use in almost all API interactions */
const baseGithubOptions = {
  json: true, //parses the responses body to automatically be js obj
  resolveWithFullResponse: true, //provides full reponse and not just body (so we get headers)
  qs: {client_id: config.githubClientId,
  client_secret: config.githubSecret}
};

//Use map and axios.all to eliminate the promise thing
//Don't need the headers
function getByUrl(url, dispatch) {
  return axios.get(url).then(resp => dispatch({type: RECIEVE_ISSUES, payload: resp.data.items}));
}

export function getIssues(searchTerm, language) {
  return function(dispatch) {
    dispatch({type: FETCH_ISSUES});
    let issueUrls = beginnerLabels.map((label) => {
      return `https://api.github.com/search/issues?q=is:issue+label:"${label}"+state:open&sort=created&order=asc`;
    });
    axios.all(issueUrls.map(url => getByUrl(url, dispatch)))
    .then(resp => dispatch({type: FETCH_ISSUES_FULFILLED}))
    .catch(err => dispatch({type: FETCH_ISSUES_REJECTED, payload: err}));
  };
}

