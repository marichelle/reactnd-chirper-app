import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';

import Dashboard from './Dashboard';
import Nav from './Nav';
import NewTweet from './NewTweet';
import TweetPage from './TweetPage';
import LoadingBar from 'react-redux-loading';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            <Nav />
            {!this.props.loading && (
              <div>
                <Route path="/" exact component={Dashboard} />
                <Route path="/new" component={NewTweet} />
                <Route path="/tweet/:id" component={TweetPage} />
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authorizedUser }) {
  return {
    loading: authorizedUser === null,
  };
}

export default connect(mapStateToProps)(App);
