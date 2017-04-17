/**
 * 服务器部署
 * by gxiaobang
 */

const gulp = require('gulp');
const sftp = require('gulp-sftp');

const { distPath } = require('./config');

// 部署
gulp.task('deploy', () => {
	gulp.src(distPath)
			.pipe(sftp({
				host: 'xxx',
				user: 'xxx',
				pass: '123'
			}));
});