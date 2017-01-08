/**
 * 前端自动化
 * @author gxiaobang
 */

var gulp = require('gulp'),
		clean = require('gulp-clean'),
		config = require('./config');

var fs = require('fs'),
		path = require('path');

// 生成md5路径
// var crypto = require('crypto');


// 文件写入
const createFile = {
	page(src) {

		var dir = path.parse(src).dir;

		// 需要先创建目录
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}

		/*console.log(
				crypto.createHash('md5').update(src).digest('hex')
			)*/

		fs.writeFile(
			src,
			`/**\n * 注：执行gulp page:create生成\n */\n` +	// 注释
			`import Page from '${src.replace('./assets/page', '@views')}';\n` +
			'depend.define(() => {\n' +
				`\treturn Page;\n` +
			'});',
			err => {
				if (err) throw err;
				// console.log('file is created');
			}
		);
	},

	index(src) {
		let content = [];
		fs.readdirSync(src).forEach(file => {
			let name = path.parse(file).name;
			if (name != 'index') {
				content.push(`export { default as ${name.replace(/^[a-z]/, a => a.toUpperCase())} } from './${name}';`);
			}
		});

		fs.writeFile(
			src + '/index.jsx',
			`/**\n * 注：执行gulp create生成\n */\n${content.join('\n')}`,
			err => {
				if (err) throw err;
				// console.log('file is created');
			}
		)
	}
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


// 清理build
gulp.task('dev:clean', () => {
	gulp.src(config.path.dev.dest, { read: false })
		.pipe(clean());
});
gulp.task('build:clean', () => {
	gulp.src(config.path.build.dest, { read: false })
		.pipe(clean());
});
/*gulp.task('page:clean', () => {
	gulp.src(config.path.page.dest, { read: false })
		.pipe(clean());
});*/
gulp.task('clean', ['dev:clean', 'build:clean'/*, 'page:clean'*/]);



// 创建components/main.jsx
gulp.task('index:init', () => {
	// createFile.index(config.path.base.src);
	createFile.index(config.path.components.src);
});
// 创建page文件
gulp.task('page:init', () => {
	// 创建page目录
	if (!fs.existsSync(config.path.page.dest)) {
		fs.mkdirSync(config.path.page.dest);
	}

	reRead(config.path.page.src, function(src) {
		src = src.replace('views', 'page');
		createFile.page(src);
	});
});
gulp.task('init', ['index:create'/*, 'page:create'*/]);