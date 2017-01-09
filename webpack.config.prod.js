/**
 * webpack打包配置
 * @author gxiaobang
 */

var webpack = require('webpack'),
		ExtractTextPlugin = require('extract-text-webpack-plugin'),
		HtmlWebpackPlugin = require('html-webpack-plugin'),
		AssetsPlugin = require('assets-webpack-plugin');

var fs = require('fs'),
		path = require('path');

var config = require('./config');

// 生成md5路径
// var crypto = require('crypto');

// NODE_ENV=production webpack 发布打包
// var debug = process.env.NODE_ENV != 'production';

var dist = './build/';

module.exports = {
	entry: {
		home: [
			'./assets/home'
		],
		// 第三方
		vendor: [
			'react', 
			'react-dom', 
			'react-router'
		]
	},
	output: {
		// publicPath: './build/public',
		path: dist,
		publicPath: dist,
		filename: '[name].[chunkHash:4].js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx', '.sass', '.scss'],
		// 别名
		alias: {
			'components': path.join(__dirname, '/assets/components'),
			// 'base': path.join(__dirname, '/assets/base'),
			// views: __dirname + '/assets/views/'
			// react: __dirname + '/build/react'
		}
	},
	/*externals: {
		requirejs: 'window.requirejs'
	},*/
	module: {
		/*externals: {
			'react': 'React',
			'react-dom': 'ReactDOM'
		},*/
		loaders: [
			{ 
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015', 'stage-2']
				},
				// exclude: 'node_modules'
			},
			{
				test: /\.scss$/,
				loaders: ['style', 'css', 'sass']
				// loader: 'style!css!sass?sourceMap'
				// loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'sass-loader'),
				// include: path.resolve(webpackConfig.path)
			}
		]/*,
		noParse: ['node_modules']*/
	},
	plugins: [
		// 全局
		/*new webpack.ProvidePlugin({
			require: 'requirejs'
		}),*/

		// new ExtractTextPlugin('styles.css'),

		// 提取相同的文件
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor', 'common']
		}),

		// 修改变量值
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"production"'
		}),

		// 压缩js
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		
		// 修改页面静态文件路径
		new HtmlWebpackPlugin({
			title: '测试',
			dir: dist,
			version: config.version,
			template: 'index.hbs',
			filename: path.join(__dirname, '/index.html'),
			/*files: {
				js: ['home']
			}*/
			chunks: [/*'styles', */'vendor', 'common', 'home'],
			inject: 'head'
		}),

		// 生成路径map
		/*new AssetsPlugin({
			path: path.join(__dirname, dist),
			filename: `assetsmap-${config.version}.js`,
			prettyPrint: true,
			metadata: { version: config.version },
			processOutput(assets) {
				return `window.assetsmap=${JSON.stringify(assets)}`;
			}
		})*/
	]
};