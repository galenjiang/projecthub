var webpack = require("webpack");
var path = require('path');
var fs = require("fs");
var srcDir = "src/";
var distDir = "dist/";

function getEntry() {
  var jsPath = path.resolve(srcDir, "js");
  var dirs = fs.readdirSync(jsPath);
  var matchs = [],
    files = {};
  dirs.forEach(function(item) {
    matchs = item.match(/(.+)\.js$/);
    if (matchs) {
      files[matchs[1]] = path.resolve(srcDir, "js", item);
    }
  });
  return files;
}
module.exports = {
  devtool: "source-map",
  entry: getEntry(),
  output: {
    path: path.join(distDir, "js"),
    publicPath: "./",
    filename: "[name].js"
  },
  module: {
    loaders: [{
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  },
  resolve: {
    alias: {
      jquery: srcDir + "js/lib/jquery.min",
      vue: srcDir + "js/lib/vue.min",
      commons: srcDir + "js/core/commons"
    },
    root: "./"
  },
  plugins: [
    new webpack.ProvidePlugin({
      "$": "jquery",
      "Vue": "vue"
    })
    ]
};
