var path = require('path');

module.exports = {
  target: 'web',
  debug: true,
  entry: {
    main: './src/js/app.jsx',
  },
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: 'build/',
    filename: '[name].js',
    chunkFilename: '[chunkhash].js',
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'jsx-loader?harmony?insertPragma=React.DOM' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
  },
};