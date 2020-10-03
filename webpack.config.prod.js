/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.config.base');

module.exports = merge(
  baseConfig,
  {
    entry: ['./src/index.js'],
    externals: {
      react: 'react',
    },
    mode: 'production',
    optimization: {
      minimize: true,
    },
    output: {
      filename: './dist/TripAnimation.js',
      library: 'TripAnimation',
      libraryTarget: 'commonjs2',
      path: __dirname,
    },
  },
);
