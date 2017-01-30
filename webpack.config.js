const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    bundle: "./src/main.js",
  },
  output: {
    path: "dist",
    filename: "[name].js",
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: "./src/www",
      },
    ]),
    new ExtractTextPlugin("[name].css"),
  ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint",
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style", "css?sourceMap"),
      },
      {
        test: /\.(jpg|png|woff2?|ttf|eot|svg)$/,
        loader: "file",
        query: {
          name: "res/[name].[ext]",
        },
      },
    ],
  },
};
