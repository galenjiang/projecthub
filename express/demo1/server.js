var path = require('path');
var express = require('express');
var ejs = require('ejs');

// start server
var app = express();

// 静态服务器中间件
app.use(express.static(path.resolve('public')));

// 设置ejs模板引擎
app.set('view engine','ejs');
//指定模板存放的目录
app.set('views',path.resolve('view'));


// 路由
app.get('/',function(req,res){
    res.render('log',{
        title: "log",
        content: "log content"
    });
});

// listen 8080
app.listen(8080,function(){
    console.log('server started!');
});
