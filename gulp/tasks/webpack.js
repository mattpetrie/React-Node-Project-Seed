var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('../../webpack.config.js');

gulp.task('webpack:build', function(callback) {
  webpack(webpackConfig, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build", err);
    gutil.log("[webpack:build]", stats.toString({
      colors: true
    }));
    callback();
  });
});
