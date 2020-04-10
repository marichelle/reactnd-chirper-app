import React from 'react';
import { connect } from 'react-redux';

import Tweet from './Tweet';
import NewTweet from './NewTweet';

class TweetPage extends React.Component {
  render() {
    const { id, replies } = this.props;

    return (
      <div>
        <Tweet id={id} />
        <NewTweet replyingTo={id} />
        {replies.length && <h3 className="center">Replies</h3>}
        <ul>
          {replies.map((id) => (
            <li key={id}>
              <Tweet id={id} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ tweets }, props) {
  const { id } = props.match.params;

  return {
    id,
    replies: !tweets[id]
      ? []
      : tweets[id].replies.sort(
          (a, b) => tweets[b].timestamp - tweets[a].timestamp
        ),
  };
}

export default connect(mapStateToProps)(TweetPage);
