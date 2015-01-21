var gulp = require('gulp');
var karma = require('karma').server;
var path = require('path');
var config = require('../config');

gulp.task('test', function(done) {
  karma.start({
    configFile: path.resolve(__dirname, '../../karma.conf.js'),
    singleRun: true
  }, function() { done() });
});

gulp.task('test-watch', function(done) {
  karma.start({
    configFile: path.resolve(__dirname, '../../karma.conf.js'),
  }, function() { done() });
});