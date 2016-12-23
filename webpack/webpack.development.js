const merge = require('webpack-merge');

const Loaders = require('./loader');
const PATHS = require('./path-help');
const HMR ='webpack-hot-middleware/client?';
const RHL3 ='webpack/hot/only-dev-server';

// If you have several entry points in entry
// configuration option, make sure HMR is in each of them
const styles = [HMR].concat(PATHS.style);

let development = merge({
    devtool: 'eval-source-map',
    entry: {
      app: [
        'webpack-hot-middleware/client?',
        'react-hot-loader/patch',
        'webpack/hot/only-dev-server',
          PATHS.app
        ],
      style: styles
    }
  },
  Loaders.devLoaders(PATHS.style),
  Loaders.devPlugins()
)


module.exports = development;
