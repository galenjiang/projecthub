(function(global) {
    var common = {};
    // 初始化
    common.init = function() {
        console.log('初始化成功');
        // 全局初始化
    }
    common.alert = function(){
        // 另个函数
    }








    if(typeof global.exports === 'object' && typeof global.module !== 'undefined'){
        module.exports = common;
    }else{
        global.common = common;
    }

})(this)
