var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var cssLoaders = ExtractTextPlugin.extract('style-loader', 'css-loader?modules');
var plugins = [
  new ExtractTextPlugin('bundle.css', {allChunks: true}),
  new webpack.optimize.UglifyJsPlugin({minimize: true})
];

module.exports = {
  entry: [
    './client/index.jsx'
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'react-hot-loader!babel?presets[]=react,presets[]=es2015'
      },
      { 
        test: /\.css$/, 
        exclude: /node_modules/,
        loader: cssLoaders
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },
  output: {
    path: __dirname + '/client/public/dist',
    filename: 'bundle.js'
  },
  plugins: plugins
};
