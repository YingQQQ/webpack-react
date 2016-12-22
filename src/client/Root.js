import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import routes from './routes';

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      {routes}
    </Provider>
  );
};
Root.propTypes = {
  store: PropTypes.shape({
    getState: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    subscribe: PropTypes.func.isRequired,
    replaceReducer: PropTypes.func.isRequired
  })
};
export default Root;
