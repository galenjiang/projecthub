var path = require('path');

module.exports = {
  entry: './entry.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.js|jsx$/,
      loaders: ['babel-loader']
    }]
  },
  externals: {
    React: "React",
    ReactDOM: "ReactDOM",
  },
  babel: {
    presets: ['es2015', 'stage-0', 'react'],
    plugins: ['transform-runtime']
  }
}
