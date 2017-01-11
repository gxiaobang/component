/**
 * webpack打包配置
 * @author gxiaobang
 */

var fs = require('fs'),
		path = require('path');


// 命令行参数
var argv = require('yargs')
						.default({ dev: false })
						.argv;

var webpackConfig = require(
		argv.dev ? 
			'./webpack.config.dev' :
			'./webpack.config.prod'
	);

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
		p = path.resolve(__dirname, p);
		reRead(p, src => {
			let key = path.parse(p).name + src.replace(p, '');

			webpackConfig.resolve.alias[ key.replace(/(\/index)?\.\w+$/, '') ] = path.resolve(__dirname, src);
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
addAlias([
	'../assets/views', 
	'../assets/base',
	'../assets/emitter', 
	'../assets/styles', 
	'../assets/components',
	'../assets/containers'
]);


console.log(webpackConfig)

module.exports = webpackConfig;