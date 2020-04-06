import React from 'react';
import { connect } from 'react-redux';
import { formatTweet } from '../utils/helpers';

class Tweet extends React.Component {
  render() {
    const { authorizedUser, tweet } = this.props;

    if (tweet === null) {
      return <p>This tweet does not exist.</p>;
    }

    return (
      <div className="tweet">
        Author: {tweet.name} <br />
        Avatar: {tweet.avatar} <br />
        Date/Time: {tweet.timestamp} <br />
        Tweet: {tweet.text} <br />
        Replies: {tweet.replies} <br />
        Likes: {tweet.likes}
        <hr />
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
    tweet: tweetFormatted
  };
}

export default connect(mapStateToProps)(Tweet);
