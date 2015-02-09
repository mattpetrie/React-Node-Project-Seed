var path = require('path');
var webpack = require('webpack');

// Don't use react-hot loader in production
var jsxLoaders = process.env.NODE_ENV === 'production' ? ['6to5-loader'] : ['react-hot', '6to5-loader'];

module.exports = {
  entry: {
    main: ['./src/js/main.jsx'],
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: jsxLoaders },
      { test: /\.css$/, loader: 'style-loader!css-loader!autoprefixer-loader?last 2 version' },
      { test: /\.less$/, loader: 'style-loader!css-loader!autoprefixer?browsers=last 2 version!less-loader' }
    ],
  },
  noInfo: true,
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: 'build/',
    filename: '[name].js',
    chunkFilename: '[chunkhash].js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.css', '.less'],
  },
  target: 'web',
};