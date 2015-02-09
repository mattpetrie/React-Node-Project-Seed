var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackConfig = require('../../../webpack.config');
var assign = require('object-assign');

gulp.task('webpack:production', ['clean'], function(callback){
  productionConfig = assign({}, webpackConfig, {
    module: {
      loaders: [
        { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['6to5-loader'] },
        { test: /\.css$/, loader: 'style-loader!css-loader!autoprefixer-loader?last 2 version' },
        { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader?includePaths[]=' +
            path.resolve(__dirname, './src/stylesheets') +
            '!autoprefixer-loader?browsers=last 2 version' },
      ],
    },
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