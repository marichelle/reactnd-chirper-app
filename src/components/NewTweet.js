import React from 'react';
import { connect } from 'react-redux';
import { handleAddTweet } from '../actions/tweets';
import { Redirect } from 'react-router-dom';

class NewTweet extends React.Component {
  state = {
    text: '',
    toHome: false,
  };

  handleChange = (e) => {
    const text = e.target.value;

    this.setState(() => ({
      text,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { dispatch, replyingTo } = this.props;
    const { text } = this.state;

    // add tweet to store
    dispatch(handleAddTweet(text, replyingTo));

    // reset state
    this.setState(() => ({
      text: '',
      toHome: replyingTo ? false : true,
    }));
  };

  render() {
    const { text, toHome } = this.state;
    const tweetMax = 280;
    const tweetLeft = tweetMax - text.length;

    /* Redirect to root if submitted */
    if (toHome === true) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <h3 className="center">Compose New Tweet</h3>
        <form className="new-tweet" onSubmit={this.handleSubmit}>
          <textarea
            className="textarea"
            placeholder="What's happening?"
            maxLength={tweetMax}
            onChange={this.handleChange}
            value={text}
          />
          {tweetLeft <= 100 && <div className="tweet-length">{tweetLeft}</div>}
          <button type="submit" className="btn" disabled={text === ''}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(NewTweet);
