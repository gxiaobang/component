/**
 * 自动化
 */
const gulp = require('gulp');
const zip = require('gulp-zip');
const moment = require('moment');

// 打包dist
gulp.task('zip', () => {
	let filename = moment().format('YYYYMMDDHHmm');
	gulp.src(['./dist/**/*', '!./dist/*.zip'])
		.pipe(zip(filename + '.zip'))
		.pipe(gulp.dest('dist'))
});
