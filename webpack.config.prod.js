/**
 * webpack打包配置（生产环境）
 * @author gxiaobang
 */

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const I18nPlugin = require("i18n-webpack-plugin");

const path = require('path');
const { version, host, port, SRC_PATH, DIST_PATH, PUBLIC_PATH } = require('./config');

// 国际化
const languages = {
	'en': require('./i18n/en.json'),
	'zh-cn': require('./i18n/zh-cn.json')
};

module.exports = {
	name: 'zh-cn',
	entry: {
		app: [
			path.resolve(SRC_PATH, './app')
		],
		// 第三方
		vendor: [
			'react', 
			'react-dom'
		]
	},
	output: {
		path: DIST_PATH,
		filename: '[name].[chunkhash:5].js',
		publicPath: PUBLIC_PATH,
		chunkFilename: '[name].[chunkhash:5].js'
	},
	resolve: {
		extensions: ['.js', '.jsx', '.sass', '.scss'],
		// 简称
		alias: {
			'@lib': path.resolve(SRC_PATH, './lib'),
			'@stores': path.resolve(SRC_PATH, './stores'),
			'@views': path.resolve(SRC_PATH, './views'),
			'@components': path.resolve(SRC_PATH, './components'),
			'@containers': path.resolve(SRC_PATH, './containers'),
			'@styles': path.resolve(SRC_PATH, './styles')
		}
	},
	module: {	
		rules: [
			{ 
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			}
		]
	},
	plugins: [

		// new ExtractTextPlugin('styles.css'),

		// 提取相同的文件
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor', 'common'],
			// minChunks: 5
		}),

		// 修改页面静态文件路径
		new HtmlWebpackPlugin({
			title: 'web组件',
			template: path.resolve(SRC_PATH, './tpl.hbs'),
			filename: `index.${version}.html`
		}),

		new I18nPlugin(languages['en']),

		// 压缩
		new webpack.optimize.UglifyJsPlugin({
			beautify: false,
			comments: false,
			compress: {
				warnings: false,
				drop_console: false
			}
		})
	]
};