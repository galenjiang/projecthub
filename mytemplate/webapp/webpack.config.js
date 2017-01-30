var webpack = require("webpack");
var path = require('path');
var fs = require("fs");
var srcDir = "src";
var distDir = "dist";

function getEntry() {
  var jsPath = path.resolve(srcDir, 'js');
  var dirs = fs.readdirSync(jsPath);
  var matchs = [],
    files = {};
  dirs.forEach(function(item) {
    matchs = item.match(/(.+)\.js$/);
    if (matchs) {
      files[matchs[1]] = path.resolve(srcDir, 'js', item);
    }
  });
  return files;
}
getEntry()
module.exports = {
    entry: getEntry(),
    output: {
      path: path.join(distDir, "js"),
      publicPath: "./js/",
      filename: "[name].js"
    },
    module: {
      //各种加载器，即让各种文件格式可用require引用
      loaders: [{
          test: /\.css$/,
          loader: "style-loader!css-loader"
        }
        //  { test: /\.scss$/, loader: "style-loader!csss-loader!less-loader"}
      ]
    },
    resolve: {
      //配置别名，在项目中可缩减引用路径
      alias: {
        // jquery: distDir + "/js/lib/jquery.min"
          // core: srcDir + "/js/core",
          // ui: srcDir + "/js/ui"
      },
      root: "./"
    },
    // externals: {
    //   "jquery": "jquery"
    // }
    plugins: [
      // new webpack.ProvidePlugin({
      //   "$": "jquery"
      // })
      new webpack.optimize.CommonsChunkPlugin("commons",["/src/js/lib/jquery.min"])
    ]
    };
