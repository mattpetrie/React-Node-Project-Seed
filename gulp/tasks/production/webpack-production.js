var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackConfig = require('../../../webpack.config');
var assign = require('object-assign');

gulp.task('webpack:production', ['clean'], function(callback){
  productionConfig = assign({}, webpackConfig, {
    plugins: [
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.DedupePlugin()
    ],
  });

  webpack(productionConfig, function(err, stats) {
    if(err) throw new gutil.PluginError('webpack:production', err);
    gutil.log('[webpack: production]', stats.toString({
      colors: true,
    }));
  });

  callback();
});