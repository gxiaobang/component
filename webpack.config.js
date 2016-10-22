/**
 * webpack打包配置
 */

var webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

var fs = require('fs'),
		path = require('path'),
		crypto = require('crypto');

// NODE_ENV=production webpack 发布打包
var debug = process.env.NODE_ENV != 'production';

var config = {
    entry: {
        home: './assets/home'
    },
    output: {
        // publicPath: './build/public',
        path: './build/' + (debug ? 'dev' : '[hash:8]') + '/',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.sass', '.scss'],
        // 别名
        alias: {
            components: __dirname + '/assets/components/main',
            // view: __dirname + '/assets/view/'
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
        // new ExtractTextPlugin('style.css', {allChunks: true}),
        new webpack.optimize.CommonsChunkPlugin('common.js')
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
// 设置entry
reRead('./assets/action', src => {
    config.entry[ 
        src.replace(/\.\/assets/, '')
            .replace(/\.jsx$/, '')
    ] = src;
});

// 设置页面别名
reRead('./assets/view', src => {
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

// console.log(config.resolve.alias);

module.exports = config;