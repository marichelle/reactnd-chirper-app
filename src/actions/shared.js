import { getInitialData } from '../utils/api';
import { receiveTweets } from '../actions/tweets';
import { receiveUsers } from '../actions/users';
import { setAuthorizedUser } from '../actions/authorizedUser';
import { hideLoading, showLoading } from 'react-redux-loading';

// hardcode authenticated user
const AUTHORIZED_ID = 'tylermcginnis';

export function handleInitialData() {
  // redux thunk pattern
  return dispatch => {
    dispatch(showLoading()); // display loading bar

    return getInitialData().then(({ tweets, users }) => {
      dispatch(receiveTweets(tweets));
      dispatch(receiveUsers(users));
      dispatch(setAuthorizedUser(AUTHORIZED_ID));
      dispatch(hideLoading()); // remove loading bar
    });
  };
}
