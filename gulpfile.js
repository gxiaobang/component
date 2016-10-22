/**
 * 前端自动化
 */

var gulp = require('gulp'),
		clean = require('gulp-clean'),
		config = require('./gulp.config');

var fs = require('fs'),
		path = require('path'),
		crypto = require('crypto');


// 文件写入
const writeFile = {
	action(src) {

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
			`/**\n * 注：执行gulp action:init生成\n */\n` +	// 注释
			`import Page from '${src.replace('action', 'view')}';\n` +
			'def(() => {\n' +
				`\treturn Page;\n` +
			'});',
			err => {
				if (err) throw err;
				console.log('file saved');
			}
		);
	},
	components(imp, exp) {
		fs.writeFile(
			config.path.components.src + '/main.jsx',
			`/**\n * 注：执行gulp components:init生成\n */\n` +	// 注释
			imp.join('\n') + `\n\nexport { ${exp.join(', ')} };`,
			err => {
				if (err) throw err;
				console.log('file saved');
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
gulp.task('build:clean', () => {
	gulp.src(config.path.build.src, { read: false })
		.pipe(clean());
});
gulp.task('action:clean', () => {
	gulp.src(config.path.action.src, { read: false })
		.pipe(clean());
});
gulp.task('clean', ['build:clean', 'action:clean']);



// write components/main.jsx
gulp.task('components:init', () => {
	let imp = [],
			exp = [];
	fs.readdirSync(config.path.components.src).forEach(file => {
		let name = path.parse(file).name,
				upperName = name.replace(/\w/, s => s.toUpperCase());
		if (name != 'main') {
			imp.push(`import ${upperName} from './${name}';`);
			exp.push(upperName);
		}
	});
	writeFile.components(imp, exp);
});
// 写入action 文件
gulp.task('action:init', () => {
	// 创建action目录
	if (!fs.existsSync(config.path.action.src)) {
		fs.mkdirSync(config.path.action.src);
	}

	reRead(config.path.view.src, function(src) {
		src = src.replace('view', 'action');
		writeFile.action(src);
	});
});
gulp.task('init', ['components:init', 'action:init']);