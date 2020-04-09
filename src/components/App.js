import React from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';

import Dashboard from './Dashboard';
import NewTweet from './NewTweet';
import LoadingBar from 'react-redux-loading';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <div>
        <LoadingBar />
        {!this.props.loading && <NewTweet />}
      </div>
    );
  }
}

function mapStateToProps({ authorizedUser }) {
  return {
    loading: authorizedUser === null,
  };
}

export default connect(mapStateToProps)(App);
