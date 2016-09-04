(function(global) {
    "use strict";

    var utils = {};
    /*
     * 指控测试 测试环境下打开，正式环境关闭
     */
    utils.console = {};
    utils.console.log = function(msg) {
            if (window && window.DEBUG && window.DEBUG === 'dev') {
                window.console.log(msg);
            }
        }
        /*
         * 获取查询字符串，返回对象{id: 1,name: util}
         */
    utils.queryParse = function() {
        var queryArr = window.location.href.split('?')[1].split('&')
        var queryObj = {};
        for (var i = 0; i < queryArr.length; i++) {
            var _arr = queryArr[i].split('=');
            queryObj[_arr[0]] = _arr[1];
        }
        return queryObj;
    }

    utils.regular = {};
    //电子邮箱
    utils.regular.email = function(str) {
            var reg = /^\w+([-+.]\w+)*\@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            return reg.test(str);
        }
        //电话号码，包括手机号+固话
    utils.regular.phone = function(str, all) {
        var reg;
        if (all) {
            reg = /(^0{0,1}(13[0-9]|15[0-9]|17[0-9]|18[0-9])[0-9]{8})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/;
        } else {
            reg = /^0{0,1}(13[0-9]|15[0-9]|17[0-9]|18[0-9])[0-9]{8}$/;
        }
        return reg.test(str);
    }

    //身份证号
    utils.regular.ID = function(str) {
        var reg = /^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12])|91)\d{4}((19\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(19\d{2}(0[13578]|1[02])31)|(19\d{2}02(0[1-9]|1\d|2[0-8]))|(19([13579][26]|[2468][048]|0[48])0229))\d{3}(\d|X|x)?$/;
        return reg.test(str);
    }

    // 正整数
    utils.regular.integer = function(str) {
        var reg = /^[1-9]\d*$/;
        return reg.test(str);
    }

    /* 时间格式化
     * 时间格式化
     * 对Date的扩展，将 Date 转化为指定格式的String
     * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
     * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
     * 例子：
     * utils.dateFormat(new Date(),"yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
     */
    utils.dateFormat = function(time, format) {
        if (typeof time === 'number') {
            time = new Date(time);
        } else if (typeof time === 'object' && time instanceof Date) {
            // do nothing
        } else {
            throw new Error('wrong type of 1\'st argument');
        }
        var oTime = {
            "M+": time.getMonth() + 1, //月份
            "d+": time.getDate(), //日
            "h+": time.getHours(), //小时
            "m+": time.getMinutes(), //分
            "s+": time.getSeconds(), //秒
            "q+": Math.floor((time.getMonth() + 3) / 3), //季度
            "S": time.getMilliseconds() //毫秒
        }
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var key in oTime) {
            if (new RegExp("(" + key + ")").test(format)) {
                format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (oTime[key]) : (("00" + oTime[key]).substr(("" + oTime[key]).length)));
            }
        }
        return format;
    }









    if (typeof global.exports === 'object' && typeof global.module !== 'undefined') {
        module.exports = utils;
    } else {
        global.utils = utils;
    }

})(this)
