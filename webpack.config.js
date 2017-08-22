const webpack                   = require('webpack');
const BundleAnalyzerPlugin      = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin         = require('html-webpack-plugin');
const CleanWebpackPlugin        = require('clean-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

// TODO: несколько точек входа?
module.exports = {
    entry: {
        app: './app/main.js'
    }, 
    output: {
        path: __dirname + '/dist',
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            loaders: {
                                sass: 'vue-style-loader!css-loader!sass-loader',
                                scss: 'vue-style-loader!css-loader!sass-loader'
                            }
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: [
                    __dirname + '/node_modules'
                ],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: NODE_ENV === 'production' ? ['transform-runtime'] : []
                        }
                    }
                ]
            },
            {
                test: /\.s[a|c]ss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader?name=images/[hash].[ext]'
                    }
                ]
            },
            {
                test: /\.json$/,
                use: [
                    {
                        loader: 'json-loader'
                    }
                ]
            }
        ]
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js','.vue','*'],
        alias: { vue: 'vue/dist/vue.js' }
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            title: 'Trash',
            template: 'app/index.ejs',
            inject: true,
        }),
        new webpack.ContextReplacementPlugin( /node_modules\/moment\/locale/, /en-gb/)
    ],
    devtool: NODE_ENV === 'development' ? 'eval-source-map' : false,

    devServer: {
        contentBase: [ __dirname + '/dist/'],
        watchContentBase: true
    }
}

if (NODE_ENV === 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings:       false,
                drop_console:   true,
                unsafe:         true
            }
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: __dirname + '/dist/report.html',
            openAnalyzer: true
        }),
        new CleanWebpackPlugin(['dist'])
    )
}