var gulp = require('gulp');
var config = require('../config');

gulp.task('watch', ['test:watch', 'webpack:dev-server', '_watch']);

gulp.task('_watch', function() {
  gulp.watch(config.markup.src, ['markup']);
});
