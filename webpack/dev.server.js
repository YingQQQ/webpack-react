require('babel-polyfill');
require('../babelServer');

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
}; //webpack-dev-middleware config if you need

const hot ={

}//webpack-hot-middleware config if you need

app.use(middleware({
  compiler: compiler,
  dev: dev,
  hot:hot
}));

middlewareRegister(app);

const hotPort = 3000;

app.listen(hotPort,()=>{
  console.info(`==> 🌎 Listening on port ${hotPort}. Open up http://localhost:${hotPort}/ in your browser.`)
});
