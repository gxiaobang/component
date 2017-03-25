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


const writeIn = {
	pages(src) {
		var ret = [];
		reRead(src, s => {
			// console.log(s);
			if (s != 'index') {
				ret.push(
					[
						`\t['${s}'](cb) {`,
							`\t\trequire.ensure([], require => {`,
								`\t\t\tcb(require('pages/${s}').default);`,
							`\t\t}, '${s}');`,
						`\t}`
					].join('\n')
				);
			}
		});

		fs.writeFile(
				`${src}/index.jsx`,
				[
					`const fns = {`,
						`${ret.join(',\n')}`,
					`};`,
					`export default url => fns[ url ];`
				].join('\n'),
				err => {
					if (err) throw err;
				}
			);
	},
	imports(src, name) {
		var ret = [];
		reRead(src, s => {
			// console.log(s);
			if (s != 'index') {
				ret.push(`export { default as ${s.replace(/^\w/, a => a.toUpperCase())} } from '${name + '/' + s}';`);
			}
		});

		fs.writeFile(
				`${src}/index.jsx`,
				ret.join('\n'),
				err => {
					if (err) throw err;
				}
			);
	}
};


// 清理build
gulp.task('clean', () => {
	gulp.src(config.path.build.dest, { read: false })
		.pipe(clean());
});

// 创建路由
gulp.task('pages', () => {
	writeIn.pages('./assets/pages');
});

// 模块导入
gulp.task('imports', () => {
	writeIn.imports('./assets/components', 'components');
});

// 初始化
gulp.task('init', ['pages', 'imports']);