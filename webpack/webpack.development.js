const merge = require('webpack-merge');

const Loaders = require('./loader');
const PATHS = require('./path-help');
const HMR ='webpack-hot-middleware/client?';

// If you have several entry points in entry
// configuration option, make sure HMR is in each of them and first
const styles = [HMR].concat(PATHS.style);

let development = merge({
    devtool: 'eval-source-map',
    entry: {
      app: [
          'eventsource-polyfill',
          HMR,
          PATHS.app
        ],
      style: styles
    }
  },
  Loaders.devLoaders(PATHS.style),
  Loaders.devPlugins()
)


module.exports = development;
