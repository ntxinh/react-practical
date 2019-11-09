const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'static/js/[name].[hash].js'
  },
  devServer: {
    contentBase: './public',
    port: 9000,
    hot: true
  },
  plugins: [
    new Dotenv({
      path: './.env.development',
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: 'body',
      templateParameters: {
        PUBLIC_URL: '',
        title: 'React Webpack App'
      }
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ]
  },
});
