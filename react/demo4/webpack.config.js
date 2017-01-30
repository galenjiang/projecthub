var path = require('path');

module.exports = {
    devtool: "source-map",
    entry: './app/entry.js',
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'js/bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.js|jsx$/,
            loaders: ['babel-loader']
        },{
            test: /\.css$/,
            loader: 'style!css'
        }]
    },
    externals: {
        React: "React",
        ReactDOM: "ReactDOM",
        $: "jQuery"
    },
    babel: {
        presets: ['es2015', 'stage-0', 'react'],
        plugins: ['transform-runtime']
    }
}
