var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: {
        test: [
          "webpack-dev-server/client?http://localhost:8080/",
          "webpack/hot/dev-server",
          "./src/js/test.js"
        ]
    },
    output: {
        publicPath: "/public/",
        path: path.resolve('dist', 'js'),
        filename: "[name].js"
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: "style!css"
        }]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
};
