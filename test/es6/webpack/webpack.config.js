var path = require('path');

function isProduction() {
  return process.env.NODE_ENV === 'production';
};
var src = 'src';
var dist = 'build';

module.exports = {
    entry: [
        path.join(src, 'entry.js')
    ],
    output: {
        path: path.join(__dirname, dist, 'js/'),
        filename: 'bundle.js',
        publicPath: "./"
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.js|jsx$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015'],
                plugins: ['transform-runtime']
            }
        }]
    },
    devtool: isProduction()?null:'source-map',
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    }
}
