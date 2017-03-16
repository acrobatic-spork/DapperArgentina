import {
  FETCH_ISSUES,
  FETCH_ISSUES_FULFILLED,
  FETCH_ISSUES_REJECTED,
  SET_ISSUE
} from '../actions/types';

const initialState = {
  current: null,
  list: [],
  fetching: false,
  receivedAt: null,
  error: null
};

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case FETCH_ISSUES:
      return {...state, fetching: true}
    case FETCH_ISSUES_REJECTED: {
      return {...state, fetching: false, error: action.payload}
    }
    case FETCH_ISSUES_FULFILLED: {
      return {
        ...state,
        fetching: false,
        recievedAt: new Date,
        list: action.payload,
      }
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
