import merge from 'lodash/merge';
import 'whatwg-fetch';
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

var myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/vnd.github.v3+json');
myHeaders.append('User-Agent', 'GitBegin App');

/**Basic gitHub request information that we want to use in almost all API interactions */
const baseGithubOptions = {
  json: true, //parses the responses body to automatically be js obj
  resolveWithFullResponse: true, //provides full reponse and not just body (so we get headers)
  headers: myHeaders,
  qs: {client_id: config.githubClientId,
  client_secret: config.githubSecret}
};

function getIssuesByLabel(label) {
  var options = {
    qs: {per_page: 100, q: `is:issue is:open label:"${label}"`}
  };
  return axios(`https://api.github.com/search/issues?q=is:issue+label:"${label}"+state:open&sort=created&order=asc`, baseGithubOptions);
}

export function getIssues(searchTerm, language) {
  return function(dispatch) {
    dispatch({type: FETCH_ISSUES});
    let issuePromises = beginnerLabels.map((label) => {
      return getIssuesByLabel(label)
        .then(response => {
          dispatch({type: RECIEVE_ISSUES, payload: response.data.items});
        })
        .catch(error => {
          dispatch({type: FETCH_ISSUES_REJECTED, payload: error});
        }); 
    });
    Promise.all(issuePromises).then(result => {
      dispatch({type: FETCH_ISSUES_FULFILLED});
    }).catch(console.log);
  };
}
