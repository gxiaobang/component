/**
 * webpack打包配置
 * @author gxiaobang
 */

var webpack = require('webpack'),
		ExtractTextPlugin = require('extract-text-webpack-plugin'),
		HtmlWebpackPlugin = require('html-webpack-plugin'),
		AssetsPlugin = require('assets-webpack-plugin');

var path = require('path');

var config = require('./config');

// 生成md5路径
// var crypto = require('crypto');

// NODE_ENV=production webpack 发布打包
// var debug = process.env.NODE_ENV != 'production';

var dist = './dev/';

module.exports = {
	entry: {
		home: [
			'webpack-dev-server/client?http://localhost:3000',
			'webpack/hot/only-dev-server',
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
		path: path.join(__dirname, dist),
		publicPath: dist,
		filename: '[name].js'
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
			template: 'index.hbs',
			filename: path.join(__dirname, '/index.html'),
			/*files: {
				js: ['home']
			}*/
			chunks: [/*'styles', */'vendor', 'common', 'home'],
			inject: 'head'
		}),

		// 热加载
		new webpack.HotModuleReplacementPlugin()

		// 生成路径map
		/*new AssetsPlugin({
			path: path.join(__dirname, prod ? 'build' : 'dev'),
			filename: `assetsmap-${config.version}.js`,
			prettyPrint: true,
			metadata: { version: config.version },
			processOutput(assets) {
				return `window.assetsmap=${JSON.stringify(assets)}`;
			}
		})*/
	],
	devtool: 'eval-source-map'
};