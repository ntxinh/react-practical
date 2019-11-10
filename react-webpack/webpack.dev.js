const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  // https://webpack.js.org/configuration/mode/
  mode: 'development',
  // https://webpack.js.org/configuration/devtool/
  devtool: 'inline-source-map',
  output: {
    // https://webpack.js.org/configuration/output/#outputpath
    path: path.resolve(__dirname, 'build'),
    // https://webpack.js.org/configuration/output/#outputpublicpath
    publicPath: '/',
    // https://webpack.js.org/configuration/output/#outputfilename
    filename: 'static/js/[name].[hash].js'
  },
  devServer: {
    // https://webpack.js.org/configuration/dev-server/#devservercontentbase
    contentBase: './public',
    // https://webpack.js.org/configuration/dev-server/#devserverport
    port: 9000,
    // https://webpack.js.org/configuration/dev-server/#devserverhost
    host: '0.0.0.0',
    // https://webpack.js.org/configuration/dev-server/#devserveropen
    open: false,
    // https://webpack.js.org/configuration/dev-server/#devserverhot
    hot: true
  },
  plugins: [
    new Dotenv({
      path: './.env.development'
    }),
    new HtmlWebpackPlugin({
      // webpack relative or absolute path to the template
      template: 'public/index.html',
      // Inject all assets into the given template or templateContent
      inject: 'body',
      // Allows to overwrite the parameters used in the template
      templateParameters: {
        PUBLIC_URL: '',
        title: 'React Webpack App'
      }
    })
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
          'sass-loader'
        ]
      }
    ]
  }
});
