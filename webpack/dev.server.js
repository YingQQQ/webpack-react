require('babel-polyfill');
require('../babelServer');

const Koa = require('koa');
const middleware = require('koa-webpack');
const webpack = require('webpack');
const devConfig = require('./webpack.development');
const middlewareRegister = require('../src/server/middlewareRegister');
const compiler = webpack(devConfig);
const app = new Koa();
const PATHS = require('./path-help');
global.__DEVELOPMENT__ = process.env.npm_lifecycle_event === 'start';
console.log(__DEVELOPMENT__)

const hotConfig = {
  noInfo: true,
  quiet: true,
  publicPath: devConfig.output.publicPath,
  stats: {
    colors: true
  }
}
app.use(middleware({
  compiler,
  hotConfig
}))

middlewareRegister(app);

const hotPort = 3000;

app.listen(hotPort,()=>{
  console.info(`==> 🌎 Listening on port ${hotPort}. Open up http://localhost:${hotPort}/ in your browser.`)
});
