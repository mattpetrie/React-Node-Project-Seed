var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer-core');

// only user react-hot-loader in development
var jsxLoaders = process.env.NODE_ENV !== 'development' ? ['babel-loader?optional=runtime'] : ['react-hot', 'babel-loader?optional=runtime'];

module.exports = {
  entry: {
    main: ['./src/js/main.jsx'],
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: jsxLoaders },
      { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader' },
      { test: /\.less$/, loader: 'style-loader!css-loader!postcss-loader!less-loader' }
    ],
  },
  noInfo: true,
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: 'build/',
    filename: '[name].js',
    chunkFilename: '[chunkhash].js',
  },
  postcss: [autoprefixer],
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.css', '.less'],
  },
  target: 'web',
};
