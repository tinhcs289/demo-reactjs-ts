const path = require('path');
const webpack = require('webpack');
const { override, addWebpackAlias, addWebpackResolve, addWebpackPlugin } = require('customize-cra');
const resolve = (dir) => path.join(__dirname, dir);
module.exports = override(
  addWebpackAlias({ '@': resolve('src') }),
  addWebpackResolve({
    fallback: {
      buffer: require.resolve('buffer/'),
      crypto: require.resolve('crypto-browserify'),
      util: require.resolve('util/'),
      stream: require.resolve('stream-browserify'),
      'process/browser': require.resolve('process/browser'),
    },
  }),
  addWebpackPlugin(
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
  )
);
