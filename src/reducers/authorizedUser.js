import { SET_AUTHORIZED_USER } from '../actions/authorizedUser';

export default function authorizedUser(state = null, action) {
  switch (action.type) {
    case SET_AUTHORIZED_USER:
      return action.id;

    default:
      return state;
  }
}
