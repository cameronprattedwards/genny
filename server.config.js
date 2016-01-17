/* eslint-disable no-var */

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './client/routes.jsx',

  target: 'node',

  externals: /^[a-z][a-z\.\-0-9]*$/,

  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
  },

  output: {
    path: './client/public/dist',
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },

  node: {
    __filename: true,
    __dirname: true,
    console: true,
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel?presets[]=react,presets[]=es2015' },
      { 
        test: /\.css$/, exclude: /node_modules/, 
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules'),
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('server.css', {allChunks: true}),
  ],
};
