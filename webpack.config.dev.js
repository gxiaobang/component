/**
 * webpack打包配置
 * @author gxiaobang
 */

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const path = require('path');
const { version, port, ASSETS_PATH, DIST_PATH, PUBLIC_PATH } = require('./config');

// 生成md5路径
// var crypto = require('crypto');

// NODE_ENV=production webpack 发布打包
// var debug = process.env.NODE_ENV != 'production';

module.exports = {
	// 调试map
	devtool: 'source-map',
	entry: {
		app: [
			`webpack-dev-server/client?http://localhost:${port}`,
			'webpack/hot/only-dev-server',
			path.resolve(ASSETS_PATH, './app')
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
		path: DIST_PATH,
		// publicPath: dist,
		filename: '[name].js',
		publicPath: PUBLIC_PATH,
		// chunkFilename: '[name].[chunkhash:5].js'
	},
	resolve: {
		extensions: ['.js', '.jsx', '.sass', '.scss'],
		// 别名
		alias: {
			'lib': path.resolve(ASSETS_PATH, './lib'),
			'pages': path.resolve(ASSETS_PATH, './pages'),
			'emitter': path.resolve(ASSETS_PATH, './emitter'),
			'styles': path.resolve(ASSETS_PATH, './styles'),
			'components': path.resolve(ASSETS_PATH, './components'),
			'containers': path.resolve(ASSETS_PATH, './containers')
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
				loader: ['react-hot-loader', 'babel-loader?cacheDirectory']
			},
			{
				test: /\.scss$/,
				loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
			}
		]
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
			title: 'react components',
			// dist: dist,
			// version: version,
			template: path.resolve(ASSETS_PATH, './tpl.hbs'),
			// filename: path.resolve(ASSETS_PATH, './index.html'),
			/*files: {
				js: ['app']
			}*/
			// chunks: [/*'styles', */'vendor', 'common', 'app'],
			inject: 'body'
		}),

		// 热加载
		new webpack.HotModuleReplacementPlugin(),

		// 浏览器打开地址
		new OpenBrowserPlugin({
			url: `http://localhost:${port}`
		})

		// 生成路径map
		/*new AssetsPlugin({
			path: path.resolve(ASSETS_PATH, prod ? 'build' : 'dev'),
			filename: `assetsmap-${version}.js`,
			prettyPrint: true,
			metadata: { version: version },
			processOutput(assets) {
				return `window.assetsmap=${JSON.stringify(assets)}`;
			}
		})*/
	],

	// 代理服务器
	devServer: {
		hot: true
	}
};