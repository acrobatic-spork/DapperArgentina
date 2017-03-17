import uniqby from 'lodash.uniqby';

import {
  FETCH_ISSUES,
  FETCH_ISSUES_FULFILLED,
  FETCH_ISSUES_REJECTED,
  RECIEVE_ISSUES,
  SET_ISSUE
} from '../actions/types';

const initialState = {
  current: null,
  list: [],
  fetching: false,
  fetchStarted: null,
  fetchCompleted: null,
  error: null
};

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case FETCH_ISSUES:
      return {...state, fetching: true, error: null}
    case FETCH_ISSUES_REJECTED: {
      return {...state, fetching: false, error: action.payload}
    }
    case RECIEVE_ISSUES: {
      if (state.fetching) {
        return {
          ...state,
          fetching: false,
          fetchStarted: new Date,
          list: action.payload,
        }
      } else {
        let list = uniqby(state.list.concat(action.payload), 'id');
        return {
          ...state,
          list
        }
      }
    }
    case FETCH_ISSUES_FULFILLED: {
      return {...state, error: null, fetchCompleted: new Date}
    }
    case SET_ISSUE: {
      return {
        ...state,  
        current: action.payload
      }
    }
    default:
      return state;
  }
};
