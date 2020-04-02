import { getInitialData } from '../utils/api';
import { receiveTweets } from '../actions/tweets';
import { receiveUsers } from '../actions/users';
import { setAuthorizedUser } from '../actions/authorizedUser';

// hardcode authenticated user
const AUTHORIZED_ID = 'sarah_edo';

export function handleInitialData() {
  // redux thunk pattern
  return dispatch => {
    return getInitialData().then((tweets, users) => {
      dispatch(receiveTweets(tweets));
      dispatch(receiveUsers(users));
      dispatch(setAuthorizedUser(AUTHORIZED_ID));
    });
  };
}
