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

// 发布产品
var prod = process.argv.slice(2).indexOf('--release') > -1;

var webpackConfig = {
	entry: {
		// 第三方
		vendor: ['react', 'react-dom'/*, 'requirejs'*/],
		home: ['./assets/home']
	},
	output: {
		// publicPath: './build/public',
		path: prod ? 'build' : 'dev',
		publicPath: (prod ? 'build' : 'dev') + '/',
		filename: prod ? '[name].[chunkHash:8].js' : '[name].js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx', '.sass', '.scss'],
		// 别名
		alias: {
			'components': path.join(__dirname, '/assets/components'),
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
					presets: ['es2015', 'stage-2', 'react']
				},
				// exclude: ['requirejs']
			},
			{
				test: /\.scss$/,
				loaders: prod ? ['style', 'css', 'sass'] : ['style', 'css?sourceMap', 'sass?sourceMap'],
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

		// 提取相同的文件
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor', 'common']
		}),

		// new ExtractTextPlugin('styles.css'),
		// 修改页面静态文件路径
		new HtmlWebpackPlugin({
			title: '测试',
			dir: prod ? 'build' : 'dev',
			version: config.version,
			template: 'index.hbs',
			filename: path.join(__dirname, '/index.html'),
			/*files: {
				js: ['home']
			}*/
			chunks: [/*'styles', */'vendor', 'common', 'home'],
			inject: 'head'
		}),
		new AssetsPlugin({
			path: path.join(__dirname, prod ? 'build' : 'dev'),
			filename: `assetsmap-${config.version}.js`,
			prettyPrint: true,
			metadata: { version: config.version },
			processOutput(assets) {
				return `window.assetsmap=${JSON.stringify(assets)}`;
			}
		})
	],
	devtool: prod ? null : 'eval-source-map'
};

// 递归读文件
function reRead(src, cb) {
	var stat = fs.statSync(src);

	// 目录
	if (stat.isDirectory()) {
		let dir = src;
		fs.readdirSync(src).forEach(file => {

			reRead(src + '/' + file, cb);
		});
	}
	// 文件
	else if (stat.isFile()) {
		// writeAction(file);
		cb && cb(src);
	}
	else {
		console.log('file is not exists');
	}
}

// 添加别名
function addAlias(paths) {
	paths.forEach(p => {
		reRead(p, src => {
			let data = path.parse(src);
			let key = `${src.replace('./assets/', '')}`;

			webpackConfig.resolve.alias[ key ] = 
				webpackConfig.resolve.alias[ key.replace(/\.\w+$/, '') ] = path.join(__dirname, src);
		});
	});
}

// 设置entry
/*reRead('./assets/views', src => {
	webpackConfig.entry[ 
		src.replace(/\.\/assets/, '')
			.replace(/\.jsx$/, '')
	] = src;
});*/


// 页面别名、样式别名、组件别名
addAlias(['./assets/views', './assets/styles', './assets/components', './assets/base']);

// console.log(webpackConfig.resolve.alias);

module.exports = webpackConfig;