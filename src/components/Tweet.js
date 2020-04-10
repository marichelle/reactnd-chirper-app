import React from 'react';
import { connect } from 'react-redux';
import { handleToggleTweet } from '../actions/tweets';
import { formatDate, formatTweet } from '../utils/helpers';
import { TiArrowBackOutline } from 'react-icons/ti';
import { TiHeartOutline } from 'react-icons/ti';
import { TiHeartFullOutline } from 'react-icons/ti';

class Tweet extends React.Component {
  handleLike = (e) => {
    e.preventDefault();

    const { authorizedUser, dispatch, tweet } = this.props;

    dispatch(
      handleToggleTweet({
        id: tweet.id,
        authorizedUser,
        hasLiked: tweet.hasLiked,
      })
    );
  };

  redirectToParent = (e) => {
    e.preventDefault();

    // todo: redirect to parent tweet
  };

  render() {
    const { tweet } = this.props;

    if (tweet === null) {
      return <p>This tweet does not exist.</p>;
    }

    const {
      name,
      parent,
      avatar,
      text,
      timestamp,
      likes,
      hasLiked,
      replies,
    } = tweet;

    return (
      <div className="tweet">
        <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
        <div className="tweet-info">
          <div>
            <span>{name}</span>
            <div>{formatDate(timestamp)}</div>
            {parent && (
              <button
                className="replying-to"
                onClick={(e) => this.redirectToParent(e, parent.id)}
              >
                Replying to @{parent.author}
              </button>
            )}
            <p>{text}</p>
          </div>
          <div className="tweet-icons">
            <TiArrowBackOutline className="tweet-icon" />
            <span>{replies !== 0 && replies}</span>
            <button className="heart-button" onClick={this.handleLike}>
              {hasLiked === true ? (
                <TiHeartFullOutline className="tweet-icon" color="#e0245e" />
              ) : (
                <TiHeartOutline className="tweet-icon" />
              )}
            </button>
            <span>{likes !== 0 && likes}</span>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authorizedUser, tweets, users }, { id }) {
  const tweet = tweets[id];
  const tweetFormatted = tweet
    ? formatTweet(
        tweet,
        users[tweet.author],
        authorizedUser,
        tweets[tweet.replyingTo]
      )
    : null;

  return {
    authorizedUser,
    tweet: tweetFormatted,
  };
}

export default connect(mapStateToProps)(Tweet);
