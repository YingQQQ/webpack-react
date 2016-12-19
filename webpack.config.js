const merge = require('webpack-merge');
const validate = require('webpack-validator');

const PATHS = require('./webpack/path-help');
const Loaders = require('./webpack/loader');
const development = require('./webpack/webpack.development');
const production = require('./webpack/webpack.production');

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

const common = merge({
    entry: {
      app: PATHS.app
    },
    output: {
      path: PATHS.build,
      filename: '[name].js',
      publicPath: '/'
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
let config;

if (TARGET && TARGET === 'start') {
  console.info('==> webpack with development')
  config = merge(common, development); // merge two config
  module.exports = validate(config, {
    quiet: true
  })
}

if (TARGET && TARGET === 'build') {
  console.info('==> webpack with production');
  config = merge(common, production);
  module.exports = validate(config, {
    quiet: true
  })
}
