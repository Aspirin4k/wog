var webpack = require('webpack');

module.exports = {
    entry: './app/main.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
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
                test: /\.(jpg|png|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader?name=images/[name].[ext]'
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
        alias: { vue: 'vue/dist/vue.js' }
    }
}