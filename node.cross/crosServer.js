var http = require('http');
var fs = require('fs');
var url = require('url');
var bodyParser = require('./bodyparser.js');




http.createServer(function(req,res){
    var urlObj = url.parse(req.url);

    bodyParser(req,function(reqBody){
        var config = {
            host: '192.168.1.101',
            port: 80,
            path: urlObj.path,
            method: req.method
        };
        console.log(req.method);
        var request = http.request(config, function(response){
            bodyParser(response,function(resBody){
                res.end(resBody);
            });
        });
        request.end()
    });




}).listen(9090,function(){
    console.log('cros服务启动')
});
