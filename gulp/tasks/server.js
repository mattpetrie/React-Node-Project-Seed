var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var config = require('../config.js').server;

gulp.task('server', function() {
  return nodemon(config)
    .on('restart', function(e) {
      console.log('Nodemon server restarted.', e);
    });
});
