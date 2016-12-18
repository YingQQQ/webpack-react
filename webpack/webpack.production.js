const merge = require('webpack-merge');
const validate = require('webpack-validator');
const Loaders = require('./loader');
const common = require('./webpack.common');
const PATHS = require('./path-help');

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

var config;


if (TARGET === 'build') {
  config = merge(
    common, {
      devtool: 'source-map',
      entry: {
        style: PATHS.style
      },
      output: {
        path: PATHS.build,
        filename: '[name].[chunkhash].js',
        chunkFilename: '[chunkhash].js'
      }
    },
    Loaders.extractBundle({
      name: 'vendor',
      entries: ['react', 'react-dom']
    }),
    Loaders.prodLoaders(PATHS.style),
    Loaders.prodPlugins([PATHS.build, PATHS.isomorphic], [PATHS.client]),
    Loaders.setFreeVariable('process.env.NODE_ENV',
      'production')
  )
} else {
  console.log('Please check your npm lifecycle')
}


module.exports = validate(config, {
  quiet: true
})
