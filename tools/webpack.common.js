const merge = require('webpack-merge');
const PATHS = require('./path-help');
const Loaders = require('./loader');


const common = merge({
    entry: {
      app: PATHS.app
    },
    output: {
      path: PATHS.build,
      filename: '[name].js'
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
  },
  Loaders.commonPreloaders(PATHS.client),
  Loaders.commonLoaders(PATHS.client),
  Loaders.commonPlugins({
    title: 'Dome',
    appMountId: 'app'
  })
);

module.exports= common
