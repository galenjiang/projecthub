var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var chalk = require('chalk')
var webpackConfig = require('./webpack.config.js')


var config = Object.create(webpackConfig)

// 修改配置
config.devtool = 'eval-source-map'
config.entry.app.unshift("webpack-dev-server/client?http://0.0.0.0:9090/", "webpack/hot/dev-server")
config.plugins.unshift(new webpack.HotModuleReplacementPlugin())


new WebpackDevServer(webpack(config), {
    contentBase: 'dev',
    stats: { colors: true },
    hot: true,
    // headers: { "X-Custom-Header": "yes" }

}).listen(9090, "0.0.0.0", function (err) {
    if (err) chalk.red("webpack-dev-server", err)
    chalk.green("[webpack-dev-server]", "http://0.0.0.0:9090/")
});
