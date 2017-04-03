/**
 * 服务器部署
 * @author gxiaobang
 */

const gulp = require('gulp');
const sftp = require('gulp-sftp');

const { DIST_PATH } = require('./config');		

// 部署
gulp.task('deploy', () => {
	gulp.src(DIST_PATH)
			.pipe(sftp({
				host: 'xxx',
				user: 'xxx',
				pass: '123'
			}));
});