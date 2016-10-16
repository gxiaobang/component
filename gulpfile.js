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
gulp.task('component:main', () => {
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
			imp.join('\n') + `\n\nexport { ${exp.join(', ')} };`,
			err => {
				if (err) throw err;
				console.log('file saved');
			}
		)
	})
});