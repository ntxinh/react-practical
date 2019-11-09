const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ResourcesManifestPlugin = require('resources-manifest-webpack-plugin');

const modeConfig = env => require(`${path.resolve(__dirname, '')}/webpack.${env}`)(env);

module.exports = ({mode} = {mode: 'production'}) => {
    return webpackMerge(
        {
            mode,
            entry: './src/index.js',
            optimization: {
                splitChunks: {
                    chunks: 'all'
                }
            },
            module: {
                rules: [
                    {
                        test: /\.jsx?$/,
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
            devServer: {
                historyApiFallback: true,
                contentBase: path.join(__dirname, 'public')
            },
            plugins: [
                new HtmlWebpackPlugin({
                    // title: 'React Webpack App',
                    template: 'public/index.html',
                    inject: 'body',
                    minify: {
                        html5: true,
                        removeComments: true,
                        collapseWhitespace: true
                    },
                    templateParameters: {
                        PUBLIC_URL: '',
                        title: 'React Webpack App'
                    }
                }),
                // new ResourcesManifestPlugin(
                //     {
                //         TO_CACHE: /.+\.(js|css|png|jpe?g|gif|svg|webp)$/
                //     },
                //     'public/service-worker.js'
                // ),
                new webpack.ProgressPlugin()
            ]
        },
        modeConfig(mode)
    );
};