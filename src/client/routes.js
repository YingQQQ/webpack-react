import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';


export default(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="accounts" component={Home} />
    </Route>
  </Router>
);
// <IndexRoute
//   getComponent={(nextState, cb) => {
//     require.ensure([], (require) => {
//       cb(null, require('./containers/Home'));
//     }, 'home');
//   }}
//   />
