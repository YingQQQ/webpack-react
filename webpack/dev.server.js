require('babel-polyfill');
require('../babelServer');
const PATHS = require('../webpack/path-help');
const ROOT = PATHS.ROOT;
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const isomorphicConfig = require('./webpack-isomorphic-tools-config');
const port = process.env.PORT || 3001;

global.__DEVELOPMENT__ = process.env.NODE_ENV === 'start';

global.webpackIsomorphicTools = new WebpackIsomorphicTools(isomorphicConfig)
  .server(ROOT, function () {
    const Koa = require('koa');
    const middleware = require('koa-webpack');
    const webpack = require('webpack');
    const devConfig = require('../webpack.config');
    const middlewareRegister = require('../src/server/middlewareRegister');
    const compiler = webpack(devConfig);
    const app = new Koa();
    const PATHS = require('./path-help');
    const dev = {
      noInfo: true,
      quiet: true,
      publicPath: devConfig.output.publicPath,
      stats: {
        colors: true
      }
    }; //webpack-dev-middleware
    const hot ={

    };//webpack-hot-middleware
    app.use(middleware({
      compiler: compiler,
      dev: dev,
      hot:hot
    }));

    middlewareRegister(app);

    app.listen(hotPort,()=>{
      console.info(`==> 🌎 Listening on port ${hotPort}. Open up http://localhost:${hotPort}/ in your browser.`)
    });
  });
