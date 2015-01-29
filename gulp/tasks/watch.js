var gulp = require('gulp');
var config = require('../config');

gulp.task('watch', ['test-watch', '_watch']);

gulp.task('_watch', function() {
  gulp.watch(config.webpack.src, ['webpack:build']);
  gulp.watch(config.markup.src, ['markup']);
  gulp.watch(config.sass.src, ['sass']);
});
