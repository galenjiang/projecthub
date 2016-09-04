var path = require('path')
var webpack = require("webpack")
var HtmlWebpackPlugin = require("html-webpack-plugin")

var debug = process.env.NODE_ENV !== 'production';

module.exports = {

    entry: {
        app: [
            './src/app'
        ],
        example: [
            './src/example'
        ]
    },

    output: {
        path: path.resolve(debug?'dev':'dist'),
        filename: debug? '[name].js':'[hash:8].[name].js',
        chunkFilename: debug? 'js/[chunkhash].js':'js/[chunkhash:8].chunk.js',

        // 公共文件生成的地址
        publicPath: debug ? '' : ''
    },

    module: {
        loaders: [

            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },

            {
                test: /\.css$/,
                // loader: 'style!css!autoprefixer?{browsers:["last 2 versions", "Android >= 4.0"]}'
                loaders: ['style', 'css', 'autoprefixer?{browsers:["last 2 versions", "Android >= 4.0"]}']
            },

            {
                test: /\.scss$/,
                // loader: 'style!css!autoprefixer?{browsers:["last 2 versions", "Android >= 4.0"]}!sass'
                loaders: ['style', 'css', 'autoprefixer?{browsers:["last 2 versions", "Android >= 4.0"]}', 'sass']
            },

            // 图片转化，小于8K自动转化为base64的编码
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url?limit=1&name=images/[hash:8].[name].[ext]'
            },

            {
                test: /\.(woff|eot|ttf)$/i,
                loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'
            },
            
        ]
    },


    resolve: {

        extensions: ['', '.js'],

        alias: {
        }
    },

    plugins: [

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['app']
        }),

        new HtmlWebpackPlugin({

            filename: 'example.html',
            template: './src/example.html',
            chunks: ['example']
            
             
        })

    ]

};



