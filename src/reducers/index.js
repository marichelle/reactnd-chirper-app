import { combineReducers } from 'redux';
import authorizedUser from '../reducers/authorizedUser';
import tweets from '../reducers/tweets';
import users from '../reducers/users';

export default combineReducers({
  authorizedUser,
  tweets,
  users
});
