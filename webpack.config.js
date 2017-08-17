const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

// TODO: несколько точек входа?
module.exports = {
    entry: {
        app: './app/main.js'
    }, 
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
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
                        loader: 'babel-loader'
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
        new webpack.NoEmitOnErrorsPlugin()
    ],
    devtool: NODE_ENV === 'development' ? 'eval-source-map' : false
}

if (NODE_ENV === 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings:       false,
                drop_console:   true,
                unsafe:         true
            }
        })
    )
}