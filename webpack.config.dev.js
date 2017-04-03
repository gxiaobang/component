/**
 * webpack打包配置（开发环境）
 * @author gxiaobang
 */

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const I18nPlugin = require("i18n-webpack-plugin");
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const path = require('path');
const { VERSION, HOST, DEV_PORT, SRC_PATH, DIST_PATH, PUBLIC_PATH } = require('./config');

// 国际化
const languages = {
	'en': require('./i18n/en.json'),
	'zh-cn': require('./i18n/zh-cn.json')
};

module.exports = {
	// 调试map
	devtool: 'eval-source-map',
	name: 'zh-cn',
	entry: {
		/*reload: [
			`webpack-dev-server/client?http://${host}:${devPort}`,
			'webpack/hot/only-dev-server',
		],*/
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
		filename: '[name].js',
		publicPath: '/',
		// chunkFilename: '[name].[chunkhash:5].js'
	},
	resolve: {
		extensions: ['.js', '.jsx', '.sass', '.scss'],
		// 简称
		alias: {
			'lib': path.resolve(SRC_PATH, './lib'),
			'stores': path.resolve(SRC_PATH, './stores'),
			'views': path.resolve(SRC_PATH, './views'),
			'components': path.resolve(SRC_PATH, './components'),
			'containers': path.resolve(SRC_PATH, './containers'),
			'styles': path.resolve(SRC_PATH, './styles'),
			'mock': path.resolve(SRC_PATH, './mock')
		}
	},
	/*externals: {
		requirejs: 'window.requirejs'
	},*/
	module: {	
		rules: [
			{ 
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
			}/*,
			{
				test: /\.(png|jpg)$/,
				use: ['url-loader?limit=25000']
			},
			{
				test: /\.(woff|woff2|eot|ttf|svg)$/,
				use: ['url-loader?limit=100000']
			}*/
		]
	},
	plugins: [

		// 热更新
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),

		// new ExtractTextPlugin('styles.css'),

		// 提取相同的文件
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor', 'common'],
			// minChunks: 5
		}),

		// 修改页面静态文件路径
		new HtmlWebpackPlugin({
			title: 'web组件',
			template: path.resolve(SRC_PATH, './tpl.hbs')
		}),

		// 浏览器打开地址
		new OpenBrowserPlugin({
			url: `http://localhost:${DEV_PORT}`
		}),

		new I18nPlugin(languages['en'])
	],

	// 代理服务器
	devServer: {
		contentBase: SRC_PATH,
		host: HOST,
		port: DEV_PORT,
		hot: true,
		inline: true,
		compress: true,
		historyApiFallback: true,
		proxy: {
			'/api': {
				target: 'http://xxx',
				secure: false,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	}
};