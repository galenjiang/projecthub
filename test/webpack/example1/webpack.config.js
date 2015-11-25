var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, './src/app.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};
