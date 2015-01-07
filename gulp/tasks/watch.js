'use strict';

var gulp = require('gulp');
var config = require('../config');

gulp.task('watch', ['watchify', 'browser-sync'], function() {
  gulp.watch(config.markup.src, ['markup']);
  gulp.watch(config.sass.src, ['sass']);
});
