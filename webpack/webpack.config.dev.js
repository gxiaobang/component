/**
 * webpack打包配置
 * @author gxiaobang
 */

var webpack = require('webpack'),
		ExtractTextPlugin = require('extract-text-webpack-plugin'),
		HtmlWebpackPlugin = require('html-webpack-plugin'),
		AssetsPlugin = require('assets-webpack-plugin');

var path = require('path');

var config = require('../config');

// 生成md5路径
// var crypto = require('crypto');

// NODE_ENV=production webpack 发布打包
// var debug = process.env.NODE_ENV != 'production';

const BASE_PATH = path.resolve(__dirname, '..');
const dist = './dev/';

module.exports = {
	entry: {
		app: [
			path.resolve(BASE_PATH, './assets/index')
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
		path: path.resolve(BASE_PATH, dist),
		publicPath: dist,
		filename: '[name].js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx', '.sass', '.scss'],
		// 别名
		alias: {
			'components': path.resolve(BASE_PATH, './assets/components'),
			// 'base': path.resolve(BASE_PATH, '/assets/base'),
			// views: BASE_PATH + '/assets/views/'
			// react: BASE_PATH + '/build/react'
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
				exclude: /node_modules/,
				loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015,presets[]=stage-2'],	
				/*loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015', 'stage-2']
				},*/
			},
			{
				test: /\.scss$/,
				loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
				// loader: 'style!css!sass?sourceMap'
				// loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'sass-loader'),
				// include: path.resolve(webpackConfig.path)
			}
		]/*,
		noParse: ['node_modules']*/
	},
	plugins: [
		// 全局requirejs
		/*new webpack.ProvidePlugin({
			require: 'requirejs'
		}),*/

		// new ExtractTextPlugin('styles.css'),

		// 提取相同的文件
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor', 'common']
		}),

		// 修改页面静态文件路径
		new HtmlWebpackPlugin({
			title: '测试',
			// dist: dist,
			version: config.version,
			template: path.resolve(BASE_PATH, './assets/tpl.hbs'),
			filename: path.resolve(BASE_PATH, './index.html'),
			/*files: {
				js: ['app']
			}*/
			chunks: [/*'styles', */'vendor', 'common', 'app'],
			inject: 'head'
		}),

		// 热加载
		new webpack.HotModuleReplacementPlugin()

		// 生成路径map
		/*new AssetsPlugin({
			path: path.resolve(BASE_PATH, prod ? 'build' : 'dev'),
			filename: `assetsmap-${config.version}.js`,
			prettyPrint: true,
			metadata: { version: config.version },
			processOutput(assets) {
				return `window.assetsmap=${JSON.stringify(assets)}`;
			}
		})*/
	],
	devtool: 'cheap-module-eval-source-map'
};