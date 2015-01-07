'use strict';

var gulp = require('gulp');

gulp.task('watch', ['browser-sync'], function() {
  gulp.watch('./src/views/**', ['markup']);
});
