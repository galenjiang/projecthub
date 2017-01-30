// 测试环境debug 不需要时注释掉
window.DEBUG = 'dev';

// 测试更换目录

if (window.DEBUG && window.DEBUG == 'dev') {
    var URL = "http://localhost/lefang/";
    // var URL = "http://192.168.1.77/lefang/";
    // var URL = "http://joyplazza.eicp.net/";


} else {
    // var URL = "http://192.168.1.77/lefang/";
    var URL = "http://joyplazza.eicp.net/";
}

window.URL = URL;
