/**
 * webpack打包配置
 */

var webpack = require('webpack'),
		ExtractTextPlugin = require('extract-text-webpack-plugin'),
		HtmlWebpackPlugin = require('html-webpack-plugin');

var fs = require('fs'),
		path = require('path');

// 生成md5路径
// var crypto = require('crypto');

// NODE_ENV=production webpack 发布打包
var debug = process.env.NODE_ENV != 'production';

var config = {
	entry: {
		home: './assets/home'
	},
	output: {
		// publicPath: './build/public',
		path: './build/' + (debug ? 'dev' : '[hash:8]'),
		filename: '[name].js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx', '.sass', '.scss'],
		// 别名
		alias: {
			'@components': __dirname + '/assets/components/main',
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
					presets: ['es2015', 'react']
				}
			},
			{
				test: /\.scss$/,
				loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
				// loader: 'style!css!sass?sourceMap'
				// loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'sass-loader'),
				// include: path.resolve(config.path)
			}
		]
	},
	plugins: [
		// 提取相同的文件
		new webpack.optimize.CommonsChunkPlugin('common.js'),
		// new ExtractTextPlugin('style.css', {allChunks: true}),
		// 修改页面静态文件路径
		new HtmlWebpackPlugin({
			title: '测试',
			dir: 'dev',
			template: 'index.hbs',
			filename: __dirname + '/index.html',
			/*files: {
				js: ['home']
			}*/
			chunks: [],
		})
	],
	devtool: 'eval-source-map'
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
			// config.entry
			// console.log(src);
			let data = path.parse(src);
			let key = `@${src.replace('./assets/', '')}`;
			config.resolve.alias[ key ] = __dirname + src.replace('.', '');
			// 去后缀
			config.resolve.alias[ key.replace(/\.\w+/, '') ] = __dirname + src.replace('.', '');
		});
	});
}

// 设置entry
reRead('./assets/action', src => {
	config.entry[ 
		src.replace(/\.\/assets/, '')
			.replace(/\.jsx$/, '')
	] = src;
});


/*
// 设置页面别名
reRead('./assets/views', src => {
	// config.entry
	// console.log(src);
	config.resolve.alias[ crypto.createHash('md5').update(src).digest('hex') ] = __dirname + src.replace('.', '');
});

// 设置样式别名
reRead('./assets/styles', src => {
	// config.entry
	// console.log(src);
	let data = path.parse(src);
	let key = `@${data.dir.replace('./assets/', '')}/${data.name}`;
	config.resolve.alias[ key ] = __dirname + src.replace('.', '');
});
*/

// 页面别名、样式别名、组件别名
addAlias(['./assets/views', './assets/styles', './assets/components']);

// console.log(config.resolve.alias);

module.exports = config;