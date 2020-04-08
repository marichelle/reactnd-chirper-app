import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading';
import authorizedUser from '../reducers/authorizedUser';
import tweets from '../reducers/tweets';
import users from '../reducers/users';

export default combineReducers({
  loadingBar: loadingBarReducer,
  authorizedUser,
  tweets,
  users
});
