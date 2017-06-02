/**
 * SVG 图库
 */

const gulp = require('gulp');
const svgSymbols = require('gulp-svg-symbols');

gulp.task('sprites', function () {
  return gulp.src('./svg/*.svg')
    .pipe(svgSymbols())
    .pipe(gulp.dest('./lib'));
});