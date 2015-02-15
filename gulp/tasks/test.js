var gulp = require('gulp');
var shell = require('gulp-shell');
var karma = require('karma').server;
var path = require('path');

gulp.task('test', ['test:client', 'test:server']);

gulp.task('test:watch', ['test:client:watch', 'test:server:watch']);

gulp.task('test:client', function(done) {
  karma.start({
    configFile: path.resolve(__dirname, '../../karma.conf.js'),
    singleRun: true
  }, done);
});

gulp.task('test:client:watch', function(done) {
  karma.start({
    configFile: path.resolve(__dirname, '../../karma.conf.js'),
  }, done);
});

gulp.task('test:server', shell.task([
  'echo Running Server Tests',
  'NODE_ENV=test ./node_modules/.bin/mocha'
], {ignoreErrors: true}));

gulp.task('test:server:watch', shell.task([
  'echo Running Server Tests with Watch',
  'NODE_ENV=test ./node_modules/.bin/mocha --watch'
], {ignoreErrors: true}));