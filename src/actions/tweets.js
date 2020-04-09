import { saveLikeToggle } from '../utils/api';

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const TOGGLE_TWEET = 'TOGGLE_TWEET';

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
