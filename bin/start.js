#!/usr/bin/env node

console.log('hello');
require('../babelServer');

// const Koa = require('koa');
// const middleware = require('koa-webpack');
// const webpack = require('webpack');
const PATHS = require('../tools/path-help');
// const config = require('../tools/webpack.development');
// const middlewareRegister = require('../src/server/middlewareRegister');


// const app = new Koa();

const ROOT = PATHS.ROOT;
// const compiler = webpack(config);
if (process.env.npm_lifecycle_event === 'dev') {
  console.log('ok');
  process.env.NODE_ENV = 'development';
} else {
  console.log('not ok');
}

global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const isomorphicConfig = require('../tools/webpack-isomorphic-tools-config');

global.webpackIsomorphicTools = new WebpackIsomorphicTools(isomorphicConfig)
  .server(ROOT, function () {
    require('../src/server.js');
  });
