var path = require('path');

module.exports = {
    entry: './app/entry.js',
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.js|jsx$/,
            loaders: ['babel-loader']
        }, {
            test: /\.scss$/,
            loader: 'style!css!sass'
        },{
            test: /\.css$/,
            loader: 'style!css'
        }]
    },
    externals: {
        React: "React",
        ReactDOM: "ReactDOM",
        marked: "marked",
        $: "jQuery"
    },
    babel: {
        presets: ['es2015', 'stage-0', 'react'],
        plugins: ['transform-runtime']
    }
}
