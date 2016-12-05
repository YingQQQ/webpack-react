const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(
  require('./webpack-isomorphic-tools-config')
);
const autoprefixer = require('autoprefixer')

exports.commonLoaders = function(include) {
    return {
        module {
            loaders: [{
                test: /\.(js|jsx)$/,
                loaders: ['babel?cacheDirectory'],
                include: include
            }{
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
        }
    }
}
exports.commonPreloaders = function(include) {
    return {
        module: {
            preLoaders: [{
                test: /\.(js|jsx)$/,
                loaders: ['eslint'],
                include: include
            }]
        }
    };
}

exports.devLoaders = function(include) {
    return {
        module: {
            loaders: [{
                    test: /\.s?css$/,
                    loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap',
										include: include
                }
            ]
        }
    }
}

exports.prodLoaders = function(include) {
    return {
        module: {
            loaders: [{
                test: require.resolve('react'),
                loader: 'expose?React'
            },{
                test: /\.s?css$/,
                loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true'),
                include: include
            }]
        }
    }
}


exports.devPlugins = function(include) {
    return {
        plugins: [
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin(),
						webpackIsomorphicToolsPlugin.development()
        ]
    }
}

exports.prodPlugins = function(clean,Purify,FreeVariable) {
		return {
        plugins: [
            new CleanWebpackPlugin(include, {
                root: process.cwd()
            }),
            new ExtractTextPlugin('[name].[chunkhash].css'),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
            new PurifyCSSPlugin({
                basePath: process.cwd(),
                paths: Purify
            }),
						new webpack.DefinePlugin(FreeVariable),
						webpackIsomorphicToolsPlugin
        ]
    }
}

// exports.setFreeVariable = function(key, value) {
//   const env = {};
//   env[key] = JSON.stringify(value);
//   return {
//     plugins: [
//       new webpack.DefinePlugin(env)
//     ]
//   };
// }
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
