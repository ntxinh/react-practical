const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: 'static/js/[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React Webpack',
      template: 'src/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'HELLO': JSON.stringify('Define variable from webpack'),
      }
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'src'),
        use: ['babel-loader']
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(woff|woff2)$/,
        use: ['url-loader'],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: ['url-loader'],
      },
    ]
  },
};