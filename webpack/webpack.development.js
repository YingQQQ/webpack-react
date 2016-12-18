const merge = require('webpack-merge');
const validate = require('webpack-validator');
const Loaders = require('./loader');
const common = require('./webpack.common');
const PATHS = require('./path-help');

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

console.log('webpack development modole')
const HMR ='webpack-hot-middleware/client?';

// If you have several entry points in entry
// configuration option, make sure HMR is in each of them
// HRM fisrt in the array
const style = [HMR].concat(PATHS.style);

var config;
if (TARGET === 'start') {
  config = merge(
    common, {
      devtool: 'eval-source-map',
      entry: {
        app:[
          'eventsource-polyfill',
          HMR,
          PATHS.app
        ],
        style:style
      }
    },
    Loaders.devLoaders(PATHS.style),
    Loaders.devPlugins()
  )
}else{
  console.log('Please check your npm lifecycle')
}

module.exports = validate(config, {
  quiet: true
})
