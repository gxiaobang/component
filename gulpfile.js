/**
 * 自动化
 */
const gulp = require('gulp');
const zip = require('gulp-zip');
const moment = require('moment');

// 存档
gulp.task('archive', () => {
	let filename = moment().format('YYYYMMDDHHmm');
	gulp.src(['./dist/**/*', '!./dist/*.zip'])
		.pipe(zip(filename + '.zip'))
		.pipe(gulp.dest('dist'))
});
