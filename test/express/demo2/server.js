var path = require('path');
var express = require('express');
var app = express();

app.use(express.static(path.resolve('public')));

app.set('view engine', 'ejs');
app.set('views', path.resolve('views'));

// app.use();

app.get('/',function(req, res){
    res.render('app', {title: "主页"})
});

app.get('/register',function(req, res){
    res.render('register', {title: "注册"})
});

app.get('/login',function(req, res){
    res.render('login', {title: "登陆"})
});



app.listen(8080,function(){
    console.log('server starting................................')
})
