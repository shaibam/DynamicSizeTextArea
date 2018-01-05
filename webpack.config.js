var path = require('path');
//var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
 
module.exports = {
  //entry: './HelloWorld.js',
  devtool: "source-map",
  entry: './main.js',
  output: { path: __dirname, filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
            presets: ['es2015', 'stage-0', 'react'],
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]!postcss-loader'
      }
    ]
  }
};