#!/usr/bin/env node

console.log('hello');
require('../babelServer');

const Koa = require('koa');
const middleware = require('koa-webpack');
const webpack = require('webpack');
const PATHS = require('../config/path-help');
const config = require('../config/webpack.development');

const app = new Koa();

const ROOT = PATHS.ROOT;
const compiler = webpack(config);
if (process.env.npm_lifecycle_event === 'start') {
  console.log('ok');
  process.env.NODE_ENV = 'development';
  if (process.env.NODE_ENV === 'development') {
    console.log('development');
  }
} else {
  console.log('not ok');
}

const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const isomorphicConfig = require('../config/webpack-isomorphic-tools-config');

global.webpackIsomorphicTools = new WebpackIsomorphicTools(isomorphicConfig)
  .development(process.env.NODE_ENV === 'development')
  .server(ROOT, () => {
    app.use(middleware({
      compiler
    }));
    app.listen(3333, () => {
      console.log('Port start at 3333');
    });
  });
