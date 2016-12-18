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

var debug = process.argv.slice(2).indexOf('--release') == -1;

var webpackConfig = {
	entry: {
		home: './assets/home'
	},
	output: {
		// publicPath: './build/public',
		path: './build/' + (debug ? 'dev' : 'release'),
		filename: debug ? '[name].js' : '[name].[chunkHash:8].js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx', '.sass', '.scss'],
		// 别名
		alias: {
			'@components': path.join(__dirname, '/assets/components/main'),
			// views: __dirname + '/assets/views/'
			// react: __dirname + '/build/react'
		}
	},
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
					presets: ['es2015', 'stage-2', 'react']
				}
			},
			{
				test: /\.scss$/,
				loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
				// loader: 'style!css!sass?sourceMap'
				// loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'sass-loader'),
				// include: path.resolve(webpackConfig.path)
			}
		]
	},
	plugins: [
		// 提取相同的文件
		new webpack.optimize.CommonsChunkPlugin('common', debug ? '[name].js' : '[name].[chunkHash:8].js'),
		new ExtractTextPlugin('styles.css'),
		// 修改页面静态文件路径
		new HtmlWebpackPlugin({
			title: '测试',
			dir: 'dev',
			template: 'index.hbs',
			filename: path.join(__dirname, '/index.html'),
			/*files: {
				js: ['home']
			}*/
			chunks: ['styles', 'common', 'home'],
			inject: 'head'
		}),
		new AssetsPlugin({
			path: path.join(__dirname, './build'),
			filename: `assetsmap-${config.version}.js`,
			prettyPrint: true,
			metadata: { version: config.version }
		})
	],
	devtool: debug ? 'eval-source-map' : null
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
			// webpackConfig.entry
			// console.log(src);
			let data = path.parse(src);
			let key = `@${src.replace('./assets/', '')}`;
			webpackConfig.resolve.alias[ key ] = path.join(__dirname, src.replace('.', ''));
			// 去后缀
			webpackConfig.resolve.alias[ key.replace(/\.\w+/, '') ] = path.join(__dirname, src.replace('.', ''));
		});
	});
}

// 设置entry
reRead('./assets/page', src => {
	webpackConfig.entry[ 
		src.replace(/\.\/assets/, '')
			.replace(/\.jsx$/, '')
	] = src;
});


// home/index?version=1.0.0访问不同的版本

/*
// 设置页面别名
reRead('./assets/views', src => {
	// webpackConfig.entry
	// console.log(src);
	webpackConfig.resolve.alias[ crypto.createHash('md5').update(src).digest('hex') ] = __dirname + src.replace('.', '');
});

// 设置样式别名
reRead('./assets/styles', src => {
	// webpackConfig.entry
	// console.log(src);
	let data = path.parse(src);
	let key = `@${data.dir.replace('./assets/', '')}/${data.name}`;
	webpackConfig.resolve.alias[ key ] = __dirname + src.replace('.', '');
});
*/

// 页面别名、样式别名、组件别名
addAlias(['./assets/views', './assets/styles', './assets/components', './assets/base']);

// console.log(webpackConfig.resolve.alias);

module.exports = webpackConfig;