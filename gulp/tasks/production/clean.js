var gulp = require('gulp');
var del = require('del');

gulp.task('clean', function(callback) {
  del([
    'build/**'
  ], callback);
});