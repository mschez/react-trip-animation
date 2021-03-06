/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');

const config = {
  module: {
    rules: [
      {
        exclude: [/node_modules/, /dist/],
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
        test: /.jsx?$/,
      },
      {
        exclude: [/node_modules/, /dist/],
        loader: 'eslint-loader',
        options: {
          cache: true,
        },
        test: /.jsx?$/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      react: path.join(__dirname, 'node_modules', 'react'),
      'react-dom': '@hot-loader/react-dom',
    },
    extensions: ['.js', '.jsx', '.json'],
    modules: [path.resolve(__dirname), 'node_modules'],
  },
};

module.exports = config;
