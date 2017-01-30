const webpack = require("webpack");
const _ = require("lodash");

const config = _.cloneDeep(require("./webpack.config.js"));

config.plugins = config.plugins.concat([
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify("production"),
    }
  }),
  new webpack.NoErrorsPlugin(),
]);

module.exports = config;
