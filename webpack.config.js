/**
 * webpack打包配置
 * @author gxiaobang
 */

var debug = process.argv.slice(2).indexOf('dev') > -1;


var fs = require('fs'),
		path = require('path');

var webpackConfig;

if (debug) {
	webpackConfig = require('./webpack.config.dev');
}
else {
	webpackConfig = require('./webpack.config.prod');
}

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

module.exports = webpackConfig;