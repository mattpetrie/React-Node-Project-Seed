'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var config = require('../config').browserSync;

gulp.task('browser-sync', function() {
  browserSync(config);
});
