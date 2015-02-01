var gulp = require('gulp');

gulp.task('build', ['markup', 'webpack:build']);

gulp.task('build:production', ['markup:production', 'webpack:production']);