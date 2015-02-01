var gulp = require('gulp');
var preprocess = require('gulp-preprocess');
var config = require('../config').markup;

gulp.task('markup', function() {
  gulp.src(config.src)
    .pipe(preprocess())
    .pipe(gulp.dest(config.dest));
});

gulp.task('markup:production', ['test', 'clean'], function() {
  gulp.src(config.src)
    .pipe(preprocess({ context: { NODE_ENV: 'production' }}))
    .pipe(gulp.dest(config.dest));
});