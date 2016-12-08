import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './containers/App';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute />
    </Route>
  </Router>
);
