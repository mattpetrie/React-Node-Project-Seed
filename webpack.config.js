var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    main: ['./src/js/app.jsx'],
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loaders: ['react-hot', 'jsx-loader?harmony?insertPragma=React.DOM'] },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' },
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
    extensions: ['', '.js', '.jsx', '.json'],
  },
  target: 'web',
};