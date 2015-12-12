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
    //各种加载器，即让各种文件格式可用require引用
    loaders: [{
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
      // , {
      //   test: /\.scss$/,
      //   loader: "style-loader!csss-loader!less-loader"
      // }
    ]
  },
  resolve: {
    //配置别名，在项目中可缩减引用路径
    alias: {
      jquery: srcDir + "js/lib/jquery.min",
      vue: srcDir + "js/lib/vue.min",
      commons: srcDir + "js/core/commons"
        // ui: srcDir + "/js/ui"
    },
    root: "./"
  },
  // externals: {
  //   "jquery": "jquery"
  // }
  plugins: [
    new webpack.ProvidePlugin({
      "$": "jquery",
      "Vue": "vue"
    })
    // 压缩慢，不用
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   },
    //   mangle: {
    //    except: ['jquery', '$', 'exports', 'require','vue']
    //  },
    //  sourceMap: true
    // })
    // 合并公共文件
    // new webpack.optimize.CommonsChunkPlugin("commons.js",["/src/js/core/commons"])
  ]
};
