module.exports = {
  target: 'web',
  debug: true,
  entry: './src/js/app.jsx',
  output: {
    filename: './build/js/bundle.js',
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