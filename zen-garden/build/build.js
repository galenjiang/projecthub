// 全局配置
process.env.NODE_ENV = 'production'

var webpack = require('webpack')
var chalk = require('chalk')
var webpackConfig = require('./webpack.config.js')

var config = Object.create(webpackConfig);

config.plugins.unshift(new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    }
}))

webpack(config, function (err, stats) {
    if (err) chalk.red("webpack", err)
    chalk.red("[webpack]", stats.toString({
        colors: true
    }))
})