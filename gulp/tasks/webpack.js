var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('../../webpack.config.js');
var assign = require('object-assign');

gulp.task('webpack:build', function(callback) {
  webpack(webpackConfig, function(err, stats) {
    if(err) throw new gutil.PluginError('webpack:build', err);
    gutil.log('[webpack:build]', stats.toString({
      colors: true
    }));
  });

  callback();
});

gulp.task('webpack:dev-server', function(callback) {
  devServerConfig = assign({}, webpackConfig, {
    debug: true,
    entry: {
      main: ['webpack/hot/dev-server'].concat(webpackConfig.entry.main)
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],
  });

  var compiler = webpack(devServerConfig);

  new WebpackDevServer(compiler, {
    noInfo: true,
    publicPath: 'http://localhost:3000/',
    contentBase: 'http://localhost:8080/',
    devtool: 'eval',
    hot: true,
    stats: {
      colors: true,
    },
  }).listen(3000, 'localhost', function(err) {
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
    gutil.log("[webpack-dev-server]",
      "running on port 3000");
  });
});