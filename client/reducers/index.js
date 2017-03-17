import { combineReducers } from "redux";

import issues from './issues';
import user from './user';

export default combineReducers({
  issues,
  user
});
