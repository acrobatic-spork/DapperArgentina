var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtendedDefinePlugin = require('extended-define-webpack-plugin');
var config = require(path.resolve(__dirname, 'config.js'));

var appRoot = path.resolve(__dirname, 'client/');
var buildDir = appRoot;

module.exports = {
  context: __dirname,
  entry: path.resolve(appRoot, 'init.js'),
  output: {
    path: buildDir,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.tsx', '.ts', '.jsx', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'SporkHub',
      template: 'client/index.html',
      inject: false
    }),
    new ExtendedDefinePlugin({
      CONFIG: config
    })
  ],
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/, /typings/],
        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?name=[name]-[sha512:hash:hex:8].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },
  devServer: {
    contentBase: buildDir,
    historyApiFallback: true,
    devtool: 'source-map',
    colors: true,
    progress: true,
    port: 3000,
    proxy: {
      '/api/*': {
        target: 'http://localhost:3001',
        secure: false
      },
      '/auth/*': {
        target: 'http://localhost:3001'
      }
    }
  }
};
