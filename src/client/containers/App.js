import React, { Component, PropTypes } from 'react';

import Header from '../components/header';

class App extends Component {
  componentDidMount() {
    console.log('into App');
  }
  render() {
    return (
      <div>
        <Header />
        <h1>AppDome</h1>
        {this.props.children}
      </div>
    );
  }
}
App.propTypes = {
  children: PropTypes.shape()
};

export default App;
