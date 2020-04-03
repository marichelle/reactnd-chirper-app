import React from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return <div>{!this.props.loading && <Dashboard />}</div>;
  }
}

function mapStateToProps({ authorizedUser }) {
  return {
    loading: authorizedUser === null
  };
}

export default connect(mapStateToProps)(App);
