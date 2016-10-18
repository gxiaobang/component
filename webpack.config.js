/**
 * webpack打包配置
 */

var webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

var fs = require('fs');

var config = {
    entry: {
        home: './assets/home'
    },
    output: {
        // publicPath: './build/public',
        path: './build/',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.sass', '.scss'],
        // 别名
        alias: {
            component: __dirname + '/assets/component/main',
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

// 设置入口
function setEntry(name) {
	// 同步读取
	var stat = fs.statSync(name);
	// 文件夹
	if (stat.isDirectory()) {
		fs.readdirSync(name).forEach(file => {
			setEntry(name + '/' + file);
		});
	}
	// 文件
	else if (stat.isFile()) {
		config.entry[ 
			name.replace(/\.\/assets/, '')
				.replace(/\.jsx$/, '')
		] = name;
	}
	else {
		console.log('路径不存在');
	}
}
setEntry('./assets/action');

module.exports = config;