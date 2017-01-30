var path = require('path');

var isProduction = function () {
  return process.env.NODE_ENV === 'production';
};


module.exports = {
    entry: [
        './app/entry.js'
    ],
    output: {
        path: path.join(__dirname, 'build/js/'),
        filename: 'bundle.js',
        publicPath: "js/"
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            // 'react': 'React'
        }
    },
    module: {
        loaders: [{
            test: /\.js|jsx$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015', "stage-0", 'react'],
              plugins: ['transform-runtime']
            }
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
    devServer:{
        contentBase:'./build'
    },
    devtool: isProduction()?null:'source-map'
}
