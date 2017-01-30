var path = require('path');
var express = require('express');
var session = require('express-session')
var app = express();

app.use(express.static(path.resolve('public')));

app.set('view engine', 'ejs');
app.set('views', path.resolve('views'));


// session设置
app.use(session({
    secret: 'zfpx', //secret的值建议使用随机字符串
    cookie: {maxAge: 60 * 1000 * 30}, // 过期时间（毫秒）
    resave:true,//每次响应结束 的时候 都重新保存session
    saveUninitialized:true //保存未初始化的session
}));

// app.use();

app.get('/',function(req, res){


    if (req.session.sign) {//检查用户是否已经登录
        res.render('app', {title: "主页"});
    } else {
        res.redirect('/login');
    }




});

app.get('/register',function(req, res){
    res.render('register', {title: "注册"})
});

app.get('/login',function(req, res){
    res.render('login', {title: "登陆"})
});
// 注册
app.post('/register',function(req, res){

});
// 登陆
app.post('/login',function(req, res){
    req.session.sign = true;
    res.redirect('/')
});


app.listen(8080,function(){
    console.log('server starting................................')
})
