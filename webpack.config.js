/**
 * webpack打包配置
 */

var webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        main: './assets/main.jsx',
        home: './assets/home.jsx'
    },
    output: {
        publicPath: './build/public',
        path: './build/',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.sass', '.scss'],
        // 别名
        alias: {
            component: '../assets/component/main'
        }
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('common.js')
    ],
    module: {
        loaders: [
            { 
            	test: /\.jsx$/,
            	loader: 'babel-loader',
            	query: {
            		presets: ['es2015', 'react']
            	}
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass?sourceMap'
            }
        ]
    },
    devtool: 'eval-source-map'
};