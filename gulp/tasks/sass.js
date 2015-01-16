'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var gutil = require('gulp-util');
var _ = require('lodash');
var config = require('../config').sass;

function handleError (error) {
  gutil.log(gutil.colors.red('Sass error: '), error.file, error.message);
}

gulp.task('sass', function() {
  return gulp.src(config.src)
    .pipe(sourcemaps.init())
    .pipe(sass(_.extend(config.options, { onError: handleError })))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({ browsers: ['last 2 version'] }))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream: true}));
});

