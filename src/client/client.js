import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore from './store/configuerStore';
import Root from './Root';
// import App from './containers/App';

if (process.env.NODE_ENV !== 'production') {
  React.Perf = require('react-addons-perf');
}
const store = configureStore(window.__REDUX_STATE__);

render(
  <AppContainer>
    <Root store={store} />
  </AppContainer>,
    document.getElementById('app')
);

// HRL3
if (module.hot) {
  module.hot.accept('./Root', () => {
    console.log('IN MODULE.HOT');
    const RootNext = require('./Root');
    render(
      <AppContainer>
        <RootNext store={store} />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}