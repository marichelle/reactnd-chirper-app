export const SET_AUTHORIZED_USER = 'SET_AUTHORIZED_USER';

export const setAuthorizedUser = id => {
  return {
    type: SET_AUTHORIZED_USER,
    id
  };
};
