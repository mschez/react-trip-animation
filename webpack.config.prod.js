/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');

const baseConfig = require('./webpack.config.base');

module.exports = merge(
  baseConfig,
  {
    entry: ['./src/index.js'],
    mode: 'production',
    optimization: {
      minimize: true,
    },
    output: {
      filename: './dist/index.js',
      library: 'TripAnimation',
      libraryTarget: 'umd',
      path: __dirname,
      umdNamedDefine: true,
    },
  },
);
