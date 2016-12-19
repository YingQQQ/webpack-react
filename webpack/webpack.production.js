const merge = require('webpack-merge');
const Loaders = require('./loader');
const PATHS = require('./path-help');

let production = merge({
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
  Loaders.prodPlugins([PATHS.build, PATHS.isomorphic]),
  Loaders.setFreeVariable('process.env.NODE_ENV',
    'production')
);


module.exports = production;
