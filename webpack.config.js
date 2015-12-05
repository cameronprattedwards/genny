var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var cssLoaders;
var plugins;

// if (process.env.CLIENT_DOMAIN == 'http://localhost:8080') {
//   cssLoaders = 'style-loader!css-loader?modules';
//   plugins = [
//     new webpack.HotModuleReplacementPlugin(),
//   ];
// } else {
  cssLoaders = ExtractTextPlugin.extract('style-loader', 'css-loader?modules');
  plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('bundle.css', {allChunks: true})
  ];
// }

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
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
    path: __dirname + '/client/dist',
    publicPath: '/public/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './client/dist',
    hot: true,
  },
  plugins: plugins
};
