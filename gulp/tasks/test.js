var gulp = require('gulp');
var karma = require('karma').server;
var path = require('path');

gulp.task('test', function(done) {
  karma.start({
    configFile: path.resolve(__dirname, '../../karma.conf.js'),
    singleRun: true
  }, done);
});

gulp.task('test:watch', function(done) {
  karma.start({
    configFile: path.resolve(__dirname, '../../karma.conf.js'),
  }, done);
});