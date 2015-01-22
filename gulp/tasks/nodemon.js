var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var config = require('../config.js').nodemon;

gulp.task('nodemon', function() {
  nodemon(config)
    .on('restart', function() {
      console.log('Nodemon server restarted.');
    });
});
