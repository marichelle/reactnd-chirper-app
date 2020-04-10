import { ADD_TWEET, RECEIVE_TWEETS, TOGGLE_TWEET } from '../actions/tweets';

export default function tweets(state = {}, action) {
  switch (action.type) {
    case ADD_TWEET:
      const { tweet } = action;
      const replyingTo =
        tweet.replyingTo !== null
          ? {
              [tweet.replyingTo]: {
                ...state[tweet.replyingTo],
                replies: state[tweet.replyingTo].replies.concat([tweet.id]),
              },
            }
          : {};

      return {
        ...state,
        ...replyingTo,
        [tweet.id]: tweet,
      };

    case RECEIVE_TWEETS:
      return {
        ...state,
        ...action.tweets,
      };

    case TOGGLE_TWEET:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          likes:
            action.hasLiked === true
              ? state[action.id].likes.filter(
                  (user) => user !== action.authorizedUser
                )
              : state[action.id].likes.concat([action.authorizedUser]),
        },
      };

    default:
      return state;
  }
}
