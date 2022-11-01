const path = require('path');

const { override, addWebpackAlias } = require('customize-cra');

const resolve = (dir) => path.join(__dirname, dir);

const aliasConfig = addWebpackAlias({ '@': resolve('src') });

module.exports = override(aliasConfig);
