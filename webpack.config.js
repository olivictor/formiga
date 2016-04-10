'use strict';

var webpack = require('webpack')

module.exports = {
  // the base path which will be used to resolve entry points
  context: __dirname,
  // the main entry point for our application's frontend JS
  entry: {
    index: './src/index.js',
  },

  output: {
    path: './dist',
    filename: 'formiga.js',
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]',
  },

  resolve: {
    extensions: ['', '.js'],
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', 
        query: { presets: ['es2015'], plugins: ['lodash'] } },
      { test: /\.js$/, exclude: [/node_modules/, /test/], loader: 'eslint-loader' },
    ],
  },

  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
}
