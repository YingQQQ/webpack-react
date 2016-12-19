const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackisomorphictoolsconfig = require('./webpack-isomorphic-tools-config');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(
  webpackisomorphictoolsconfig
);
const PurifyCSSPlugin = require('purifycss-webpack-plugin');

exports.commonLoaders = function (include) {
  return {
    module: {
      loaders: [{
        test: /\.(js|jsx)$/,
        loaders: ['babel?cacheDirectory'],
        include: include
      }, {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      }, {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url-loader?limit=10240'
      }]
    },
    postcss: [
       require('autoprefixer')({
        browsers: ['last 2 versions'],
      })
    ]
  }
}
exports.commonPreloaders = function (include) {
  return {
    module: {
      preLoaders: [{
        test: /\.(js|jsx)$/,
        loaders: ['eslint'],
        include: include
      }]
    }
  };
};

exports.devLoaders = function (include) {
  return {
    module: {
      loaders: [{
        test: /\.s?css$/,
        loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss!sass?outputStyle=expanded&sourceMap',
        include: include
      },{
        test: require.resolve('react'),
        loader: 'expose?React'
      },]
    }
  };
};

exports.prodLoaders = function (include) {
  return {
    module: {
      loaders: [{
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract('style', ['css?modules&importLoaders=1&sourceMap', 'postcss-loader', 'sass']),
        include: include
      }]
    }
  };
};


exports.commonPlugins = function (options) {
  return {
    plugins: [
      new HtmlWebpackPlugin({
        template: require('html-webpack-template'),
        title: options.title,
        appMountId: options.appMountId,
        inject: false
      })
    ]
  };
};

exports.devPlugins = function() {
  return {
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin({
        multiStep: true
      }),
      webpackIsomorphicToolsPlugin.development()
    ]
  };
};

exports.prodPlugins = function(clean) {
  return {
    plugins: [
      new CleanWebpackPlugin(clean, {
        root: process.cwd()
      }),
      new ExtractTextPlugin('[name].[chunkhash].css'),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      // new PurifyCSSPlugin({
      //   basePath: process.cwd(),
      //   paths: Purify
      // }), //disabled wehen no anthoer styles
      webpackIsomorphicToolsPlugin
    ]
  };
};
exports.setFreeVariable = function(key, value) {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [
      new webpack.DefinePlugin(env)
    ]
  };
}
exports.extractBundle = function(options) {
  const entry = {};
  entry[options.name] = options.entries;

  return {
    entry: entry,
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        names: [options.name, 'manifest'],
        minChunks: Infinity
      })
    ]
  };
}
