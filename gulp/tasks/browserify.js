'use strict';

var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserSync = require('browser-sync');
var _ = require('lodash');
var config = require('../config').browserify;

function browserifyTask(callback, devMode) {

  var bundleConfig = config.bundleConfig;
  _.extend(bundleConfig, watchify.args, { debug: true, transform: [reactify] });

  var b = browserify(bundleConfig);

  function bundle() {
    return b.bundle()
      .on('error', function(err) {
        gutil.log(gutil.colors.red('Browserify error: '), err);
      })
      .pipe(source(bundleConfig.outputName))
      .pipe(gulp.dest(bundleConfig.dest))
      .pipe(browserSync.reload({stream: true}));
  }

  if(devMode) {
    console.log('watchifying');
    b = watchify(b);
    b.on('update', bundle);
  }

  return bundle();
}

gulp.task('browserify', browserifyTask);

module.exports = browserifyTask;
