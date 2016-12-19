#!/usr/bin/env node

console.log('isomorphic server');
const PATHS = require('../webpack/path-help');

const ROOT = PATHS.ROOT;

global.__DEVELOPMENT__ = process.env.NODE_ENV === 'start';

const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const isomorphicConfig = require('../webpack/webpack-isomorphic-tools-config');

global.webpackIsomorphicTools = new WebpackIsomorphicTools(isomorphicConfig)
  .server(ROOT, function () {
    require('../webpack/dev.server');
  });
