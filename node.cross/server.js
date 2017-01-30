var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function(req, res){
    var urlObj = url.parse(req.url, true);
    if(urlObj.pathname == '/'){
        var rs = fs.createReadStream('./index.html',{
            flags: 'r'
        });
        console.log(rs);
        rs.pipe(res);
    } else if(urlObj.pathname == '/favicon.ico'){
        res.end();
    } else if(urlObj.pathname == '/app.js'){
        fs.createReadStream('./app.js',{
            flags: 'r'
        }).pipe(res);
    } else if(urlObj.pathname == '/ajax'){
        res.write('ajax');
        res.end();
    }
}).listen(8080,function(){
    console.log('服务器启动');
});
