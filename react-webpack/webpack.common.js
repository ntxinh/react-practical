const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    main: './src/index.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'public')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'HELLO': JSON.stringify('Define variable from webpack'),
      }
    }),
    new webpack.ProgressPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'src'),
        use: ['babel-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/media/[name].[contenthash].[ext]'
            }
          }
        ]
      }
    ]
  },
};
