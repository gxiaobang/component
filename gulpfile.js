/**
 * 前端自动化
 */

var gulp = require('gulp'),
		clean = require('gulp-clean'),
		config = require('./gulp.config.json');

var fs = require('fs'),
		path = require('path');


gulp.task('clean', () => {
	gulp.src(config.path.clean.src, { read: false })
		.pipe(clean());
});

// 写入component main文件
gulp.task('component:init', () => {
	fs.readdir(config.path.component.src, (err, files) => {

		if (err) throw err;

		var imp = [],
				exp = [];
		files.forEach(file => {
			// console.log(path);
			var name = path.parse(file).name,
					upperName = name.replace(/\w/, s => s.toUpperCase());
			if (name != 'main') {
				imp.push(`import ${upperName} from './${name}';`);
				exp.push(upperName);
			}
		});

		fs.writeFile(
			config.path.component.src + 'main.jsx',
			`/**\n * 注意：执行gulp component:init生成\n */\n` +	// 注释
			imp.join('\n') + `\n\nexport { ${exp.join(', ')} };`,
			err => {
				if (err) throw err;
				console.log('file saved');
			}
		)
	})
});

function writeAction(file) {
	fs.writeFile(
		config.path.action.dest + file,
		`/**\n * 注意：执行gulp action:init生成\n */\n` +	// 注释
		'define(() => {\n' +
			`\timport Page from 'view/${file}';\n` +
			`\treturn Page;\n` +
		'});',
		err => {
			if (err) throw err;
			console.log('file saved');
		}
	);
}

gulp.task('action:init', () => {
	fs.readdir(config.path.action.src, (err, files) => {
		if (err) throw err;

		// console.log(files);
		files.forEach(file => {
			fs.stat(config.path.action.src + file, (err, stat) => {

				if (err) throw err;
				// 文件夹
				if (stat.isDirectory()) {
					var dir = file;
					fs.readdir(config.path.action.src + file, (err, files) => {
						if (err) throw err;

						files.forEach((file) => {
							writeAction(dir + '/' + file);
						});
					});
				}
				// 文件
				else if (stat.isFile()) {
					writeAction(file);
				}
				else {
					console.log('路径不存在');
				}
			});
		});
	});
});