const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'static/js/[name].[contenthash].js'
  },
  plugins: [
    new Dotenv({
      path: './.env.production'
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: 'body',
      // Controls if and in what ways the output should be minified
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      templateParameters: {
        PUBLIC_URL: '',
        title: 'React Webpack App'
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash].css'
    }),
    new CopyPlugin([
      {
        from: 'public/',
        to: '.',
        ignore: ['service-worker.js']
      }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  }
});
