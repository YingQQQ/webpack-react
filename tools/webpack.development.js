const merge = require('webpack-merge');
const validate = require('webpack-validator');
const Loaders = require('./loader');
const common = require('./webpack.common');
const PATHS = require('./path-help');

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

var config;
if (TARGET === 'dev') {
  config = merge(
    common, {
      devtool: 'eval-source-map',
      entry: {
        style: PATHS.style
      }
    },
    Loaders.devServer({
        host: process.env.HOST,
        port: process.env.PORT
      }),
    Loaders.devLoaders(PATHS.style),
    Loaders.devPlugins()
  )
}else{
  console.log('Please check your npm lifecycle')
}


module.exports = validate(config, {
  quiet: true
})
