import { saveLikeToggle, saveTweet } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

export const ADD_TWEET = 'ADD_TWEET';
export const TOGGLE_TWEET = 'TOGGLE_TWEET';
export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';

export function addTweet(tweet) {
  return {
    type: ADD_TWEET,
    tweet,
  };
}

export function receiveTweets(tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets,
  };
}

function toggleTweet({ id, authorizedUser, hasLiked }) {
  return {
    type: TOGGLE_TWEET,
    id,
    authorizedUser,
    hasLiked,
  };
}

export function handleAddTweet(text, replyingTo) {
  return (dispatch, getState) => {
    const { authorizedUser } = getState();

    dispatch(showLoading());

    return saveTweet({
      text,
      author: authorizedUser,
      replyingTo,
    })
      .then((tweet) => {
        dispatch(addTweet(tweet));
      })
      .then(() => {
        dispatch(hideLoading());
      });
  };
}

export function handleToggleTweet(info) {
  return (dispatch) => {
    dispatch(toggleTweet(info));

    // optimistic update
    return saveLikeToggle(info).catch((e) => {
      console.warn('Error in handleToggleTweet: ', e);

      alert('There was an error liking a tweet. Please try again.');
      dispatch(toggleTweet(info));
    });
  };
}
