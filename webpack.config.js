/**
 * webpack打包配置
 */

var webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        // react: './node_modules/react/react.js',
        main: './assets/main.jsx',
        home: './assets/home.jsx',
        // action: './assets/action/**/*.jsx'
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
            component: __dirname + '/assets/component/main',
            view: __dirname + '/assets/view/'
            // react: __dirname + '/build/react'
        }
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('common.js')
    ],
    module: {
        /*externals: {
            'react': 'React',
            'react-dom': 'ReactDOM'
        },*/
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
                // loader: 'style!css!sass?sourceMap'
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'sass-loader'),
                // include: path.resolve(config.path)
            }
        ]
    },
    devtool: 'eval-source-map'
};