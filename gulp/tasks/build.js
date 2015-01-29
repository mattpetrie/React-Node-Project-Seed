var gulp = require('gulp');

gulp.task('build', ['sass', 'markup', 'webpack:build']);