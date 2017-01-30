var path = require('path');

function isProduction() {
  return process.env.NODE_ENV === 'production';
};

var dist = 'build/js';

module.exports = {
  entry: [
    './app/entry.js'
  ],
  output: {
    path: path.join(__dirname, dist),
    filename: 'bundle.js',
    publicPath: "js/"
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.js|jsx$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', "stage-0", 'react'],
        plugins: ['transform-runtime']
      }
    }]
  },
  devtool: isProduction() ? null : 'source-map',
  devServer:{
      contentBase:'./build'
  },
  babel: {
    presets: ['es2015', 'stage-0', 'react'],
    plugins: ['transform-runtime']
  }
}
