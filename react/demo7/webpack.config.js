var path = require('path');

var isProduction = function () {
  return process.env.NODE_ENV === 'production';
};

module.exports = {
    entry: [
        './app/entry.js'
    ],
    output: {
        path: path.join(__dirname, '/build/js'),
        filename: 'bundle.js',
        publicPath: "./"
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
        },{
            test: /\.(jpe?g|png|gif|svg)$/,
            loader: 'url?limit=1024&name=img/[name].[ext]'
        },
        {
            test: /\.(woff2?|otf|eot|svg|ttf)$/i,
            loader: 'url?name=fonts/[name].[ext]'
        }]
    },
    
    devtool: isProduction()?null:'source-map',
    babel: {
        presets: ['es2015', 'stage-0', 'react'],
        plugins: ['transform-runtime']
    }
}
