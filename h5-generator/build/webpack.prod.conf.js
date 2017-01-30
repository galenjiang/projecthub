var path = require('path')

module.exports = {
    entry: {
      common: "./src/js/common.js",
      test: "./src/js/test.js"
    },
    output: {
        path: path.resolve('dist', 'js'),
        filename: "[name].js"
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: "style!css"
        }]
    }
};
