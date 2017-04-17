/**
 * 生成字体图标
 */

const gulp = require('gulp');
const iconfont = require('gulp-iconfont');
const iconfontCss = require('gulp-iconfont-css');

// 生成图标
gulp.task('iconfont', /*['example'],*/ () => {
  gulp.src('./svg/*.svg')
    .pipe(iconfontCss({
      fontName: 'rc-smart',
      path: 'template.css',
      targetPath: '../index.css',
      fontPath: './fonts/'
    }))
    .pipe(iconfont({
      fontName: 'rc-smart',
      formats: ['svg', 'ttf', 'eot', 'woff'],
      normalize: true
    }))
    .pipe(gulp.dest('./fonts/'));
});