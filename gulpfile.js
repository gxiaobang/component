/**
 * 前端自动化
 * @author gxiaobang
 */

var gulp = require('gulp'),
		clean = require('gulp-clean'),
		config = require('./config');

var fs = require('fs'),
		path = require('path');


// 递归读文件
function reRead(src, cb, rootSrc) {
	src = path.resolve(__dirname, src);
	if (!rootSrc) {
		rootSrc = src;
	}

	var stat = fs.statSync(src);

	// 目录
	if (stat.isDirectory()) {
		fs.readdirSync(src).forEach(file => {

			reRead(src + '/' + file, cb, rootSrc);
		});
	}
	// 文件
	else if (stat.isFile()) {
		// writeAction(file);
		cb && cb(
			src.replace(rootSrc, '')
				 .replace(/\\/g, '/')
				 .replace(/^\//, '')
				 .replace(/\.\w+$/, '')
		);
	}
	else {
		console.log('file is not exists');
	}
}


// 清理build
gulp.task('clean', () => {
	gulp.src(config.path.build.dest, { read: false })
		.pipe(clean());
});

// 创建路由
gulp.task('routes', () => {
	var fns = [];
	reRead('./assets/routes', src => {
		// console.log(src);
		if (src != 'index') {
			fns.push(
				[
					`\t['${src}'](cb) {`,
						`\t\trequire.ensure([], require => {`,
							`\t\t\tcb(require('routes/${src}').default);`,
						`\t\t}, '${src}');`,
					`\t}`
				].join('\n')
			);
		}
	});

	fs.writeFile(
			'./assets/routes/index.jsx',
			[
				`const fns = {`,
					`${fns.join(',\n')}`,
				`};`,
				`export default url => fns[ url ];`
			].join('\n'),
			err => {
				if (err) throw err;
			}
		);
});