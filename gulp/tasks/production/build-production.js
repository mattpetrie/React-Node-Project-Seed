var gulp = require('gulp');

gulp.task('build:production', ['markup:production', 'webpack:production']);