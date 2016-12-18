import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configuerStore';
import routes from './routes';

if (process.env.NODE_ENV !== 'production') {
  React.Perf = require('react-addons-perf');
}
const store = configureStore(window.__REDUX_STATE__);

render(
  <Provider store={store}>
    {routes}
  </Provider>,
    document.getElementById('app')
);
