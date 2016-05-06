/**
 *   mui 0.0.1
 *   2016-01-27
 **/

var Mui = {};

/**
 *   设备检测
 **/
/*==================== start ====================*/
+ function() {
    "use strict";
    var device = {};
    var ua = navigator.userAgent;

    //检测哪些设备
    var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/),
        ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
        ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/),
        iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);

    device.ios = device.android = device.iphone = device.ipad = device.androidChrome = false;

    // Android
    if (android) {
        device.os = "android";
        device.osVersion = android[2];
        device.android = true;
        device.androidChrome = ua.toLowerCase().indexOf("chrome") >= 0;
    }
    if (ipad || iphone || ipod) {
        device.os = "ios";
        device.ios = true;
    }
    // iOS
    if (iphone && !ipod) {
        device.osVersion = iphone[2].replace(/_/g, ".");
        device.iphone = true;
    }
    if (ipad) {
        device.osVersion = ipad[2].replace(/_/g, ".");
        device.ipad = true;
    }
    if (ipod) {
        device.osVersion = ipod[3] ? ipod[3].replace(/_/g, ".") : null;
        device.iphone = true;
    }
    // iOS 8+ changed UA
    if (device.ios && device.osVersion && ua.indexOf("Version/") >= 0) {
        if (device.osVersion.split(".")[0] === "10") {
            device.osVersion = ua.toLowerCase().split("version/")[1].split(" ")[0];
        }
    }

    // Webview
    device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);

    // Minimal UI
    if (device.os && device.os === "ios") {
        var osVersionArr = device.osVersion.split(".");
        device.minimalUi = !device.webView &&
            (ipod || iphone) &&
            (osVersionArr[0] * 1 === 7 ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7) &&
            document.querySelector("meta[name='viewport']").length > 0 && document.querySelector("meta[name='viewport']").getAttribute("content").indexOf("minimal-ui") >= 0;
    }

    // Check for status bar and fullscreen app mode
    var windowWidth = document.body.clientWidth;
    var windowHeight = document.body.clientHeight;
    device.statusBar = false;
    if (device.webView && (windowWidth * windowHeight === screen.width * screen.width)) {
        device.statusBar = true;
    } else {
        device.statusBar = false;
    }

    // Classes
    var classNames = [];

    // Pixel Ratio
    device.pixelRatio = window.devicePixelRatio || 1;
    classNames.push("pixel-ratio-" + Math.floor(device.pixelRatio));
    if (device.pixelRatio >= 2) {
        classNames.push("retina");
    }

    // OS classes
    if (device.os) {
        classNames.push(device.os, device.os + "-" + device.osVersion.split(".")[0], device.os + "-" + device.osVersion.replace(/\./g, "-"));
        if (device.os === "ios") {
            var major = parseInt(device.osVersion.split(".")[0], 10);
            for (var i = major - 1; i >= 6; i--) {
                classNames.push("ios-gt-" + i);
            }
        }

    }
    // Status bar classes
    if (device.statusBar) {
        classNames.push("with-statusbar-overlay");
    } else {
        var htmlClassName = document.querySelector("html").className;
        document.querySelector("html").className = htmlClassName.replace("with-statusbar-overlay", " ");
    }

    // Add html classes
    if (classNames.length > 0) {
        document.querySelector("html").className = classNames.join(" ");
    }

    device.isWeixin = /MicroMessenger/i.test(ua);

    device.winWidth = windowWidth;
    device.winHeight = windowHeight;

    Mui.device = device;
}();
/*==================== end ====================*/


/**
 *   正则验证
 **/
/*==================== start ====================*/

+ function() {
    "use strict";
    var regular = {};
    //电子邮箱
    regular.email = function(str) {
            var reg = /^\w+([-+.]\w+)*\@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            return reg.test(str);
        }
        //电话号码，包括手机号+固话
    regular.phone = function(str, all) {
        var reg;
        if (all) {
            reg = /(^0{0,1}(13[0-9]|15[0-9]|17[0-9]|18[0-9])[0-9]{8})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/;
        } else {
            reg = /^0{0,1}(13[0-9]|15[0-9]|17[0-9]|18[0-9])[0-9]{8}$/;
        }
        return reg.test(str);
    }

    //身份证号
    regular.ID = function(str) {
        var reg = /^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12])|91)\d{4}((19\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(19\d{2}(0[13578]|1[02])31)|(19\d{2}02(0[1-9]|1\d|2[0-8]))|(19([13579][26]|[2468][048]|0[48])0229))\d{3}(\d|X|x)?$/;
        return reg.test(str);
    }

    // 正整数
    regular.integer = function(str) {
        var reg = /^[1-9]\d*$/;
        return reg.test(str);
    }

    Mui.regular = regular;
}();

/*==================== end ====================*/


/**
 *   常用函数
 **/
/*==================== start ====================*/

+ function() {
    "use strict";

    // 判断是否有移动
    var base = {
        hasMove: false,
        init: function() {
            base.on();
        },
        on: function() {
            document.addEventListener("touchstart", base.move);
            document.addEventListener("touchmove", base.move);
        },
        off: function() {
            base.hasMove = false;
            document.removeEventListener("touchstart", base.move);
            document.removeEventListener("touchmove", base.move);
        },
        move: function(e) {
            if (e.type == "touchstart") {
                base._x = e.targetTouches[0].pageX;
                base._y = e.targetTouches[0].pageY;
                base.hasMove = false;
            } else if (e.type == "touchmove") {
                var _x = e.targetTouches[0].pageX;
                var _y = e.targetTouches[0].pageY;
                if (Math.abs(_x - base._x) > 10 || Math.abs(_y - base._y) > 10) {
                    base.hasMove = true;
                }
            }
        }
    };

    //将手机号码中间四位隐藏
    base.phoneHideToStar = function(tel) {
        if (!tel || typeof tel !== "string") {
            return false;
        }
        tel = tel.split("");
        tel.splice(3, 4, "****");

        return tel.join("");
    }

    //获取地址栏参数，第二个参数url可选，若填写则只从填写的url中查询；
    base.getQueryString = function(name, url) {
        if (url) {
            url = url.split("?")[1];
        }
        var str = url || window.location.search.substr(1);
        if (str.indexOf(name) != -1) {
            var pos_start = str.indexOf(name) + name.length + 1;
            var pos_end = str.indexOf("&", pos_start);
            if (pos_end == -1) {
                return decodeURI(str.substring(pos_start));
            } else {
                return decodeURI(str.substring(pos_start, pos_end));
            }
        } else {
            return "";
        }
    }

    base.setQueryString = function(name, val) {
        var search = "";
        if (typeof name == "string" && val) {
            name = name.trim();
            val = String(val).trim();
            search = "?" + name + "=" + val;
        } else if (typeof name == "object") {
            for (var i in name) {
                search += String(i).trim() + "=" + String(name[i]).trim() + "&";
            }
            if (search != "") {
                search = "?" + search.replace(/\&$/, "");
            }
        }
        var url = window.location.origin + window.location.pathname;
        url += search;
        window.history.pushState(null, null, url);
    }


    // 获取字符串的真实长度，即中文为2个，英文为1个的形式,继承在String下
    + function() {
        String.prototype.realLength = function() {
            var bytelen = 0,
                len = this.length,
                charCode = -1;
            for (var i = 0; i < len; i++) {
                charCode = this.charCodeAt(i);
                if (charCode >= 0 && charCode <= 128)
                    bytelen += 1;
                else
                    bytelen += 2;
            }
            return bytelen;
        }
    }();

    //键盘点击自动消失
    document.querySelector("body").addEventListener("touchend", function(e) {
        var _targetArray = ["input", "select", "textarea"];
        var _target = e.target.tagName.toLowerCase();
        if (_targetArray.indexOf(_target) < 0 && _targetArray.indexOf(document.activeElement.tagName.toLowerCase()) >= 0) {
            document.activeElement.blur();
        }
        return false;
    }, false);


    base.init();
    Mui.base = base;
}();


/*==================== start ====================*/


/**
 *   loading
 **/
/*==================== start ====================*/
// ;function(){
//     var loading = {};

//     //显示的html、样式
//     var modal = function(){

//     }

//     loading.show = function(title){

//     }
// }();

/*==================== start ====================*/


//   message
/*==================== start ====================*/
+ function() {
    "use strict";

    var message = {};

    //默认按钮名称
    var defaultDialogTitle = "提示",
        defaultButtonOkTitle = "确认",
        defaultButtonCancelTitle = "取消";

    var _body = document.querySelector("body");

    //阻止默认事件
    message.preventDefault = function(e) {
        e.preventDefault();
    }

    //动画事件结束移除modal
    message.removeModal = function() {
        if (document.querySelector("#mui-modal") && document.querySelector("#mui-modal").length <= 0) {
            return false;
        }
        _body.removeChild(this.parentNode);
    }

    //初始化生成html，事件
    message.modal = function(o) {
        // var _modal = document.querySelector("#mui-modal");
        // if (_modal) {
        //     var _buttons = _modal.querySelectorAll(".mui-dialog-button") || [];
        //     for (var j = 0; j < _buttons.length; j++) {
        //         _buttons[j].removeEventListener("touchend", btnEvent, false);
        //     }
        //     _body.removeChild(_modal);
        // }
        //
        // var _modalView = document.createElement("div"),
        //     _html = "";
        // _modalView.id = "mui-modal";
        // _modalView.className = "mui-modal";

        if (o.type == "toast") {
            var _modal = document.querySelector("#mui-modal");
            if(_modal){
                return false
            }
            if (_modal) {
                var _buttons = _modal.querySelectorAll(".mui-dialog-button") || [];
                for (var j = 0; j < _buttons.length; j++) {
                    _buttons[j].removeEventListener("touchend", btnEvent, false);
                }
                _body.removeChild(_modal);
            }

            var _modalView = document.createElement("div"),
                _html = "";
            _modalView.id = "mui-modal";
            _modalView.className = "mui-modal";
            _modalView.className += " mui-toast";
            _html = '<div class="mui-modal-overlay"></div><div class="mui-dialog"><p class="mui-dialog-msg">' + o.msg + '</p></div>';
        } else {
            var _modal = document.querySelector("#mui-modal");
            if (_modal) {
                var _buttons = _modal.querySelectorAll(".mui-dialog-button") || [];
                for (var j = 0; j < _buttons.length; j++) {
                    _buttons[j].removeEventListener("touchend", btnEvent, false);
                }
                _body.removeChild(_modal);
            }

            var _modalView = document.createElement("div"),
                _html = "";
            _modalView.id = "mui-modal";
            _modalView.className = "mui-modal";
            _html = '<div class="mui-modal-overlay"></div> <div class="mui-dialog">';
            _html += '<div class="mui-dialog-content"><h2 class="mui-dialog-title">' + o.title + '</h2>';
            _html += '<p class="mui-dialog-msg">' + o.msg + '</p></div><div class="mui-dialog-buttons">';

            for (var i = 0; i < o.buttons.length; i++) {
                _html += '<a href="javascript:void(0)" data-index="' + (i + 1) + '" class="mui-dialog-button">' + o.buttons[i] + '</a>';
            }
            _html += '</div></div>';
        }

        _modalView.innerHTML = _html;

        _body.appendChild(_modalView);

        _modal = document.querySelector("#mui-modal");

        //判断是否是toast
        if (o.type == "toast") {
            var _timeout = setTimeout(function() {
                message.closeModal(_modal);
                if (o.callback && typeof o.callback === "function") {
                    o.callback();
                }

                clearTimeout(_timeout);
            }, o.duration);
        }


        //点击之后事件
        function btnEvent(e) {
            if (Mui.base.hasMove) {
                return false;
            }
            //先关闭
            message.closeModal(_modal);
            var _target = e.target,
                _index = _target.getAttribute("data-index");
            if (!o.callback || typeof o.callback !== "function") {
                e.preventDefault();
                return false;
            }
            var _ret = {};
            _ret.buttonIndex = _index;
            o.callback(_ret);
            console.log(1, e);
            e.preventDefault();
            return false;
        }

        //添加事件
        var _buttons = _modal.querySelectorAll(".mui-dialog-button") || [];
        for (var j = 0; j < _buttons.length; j++) {
            _buttons[j].addEventListener("touchend", btnEvent, false);
        }

        //显示modal
        message.openModal(_modal);
        return false;
    }

    //显示modal，通过动画的形式
    message.openModal = function(modal) {
        modal.className += " mui-flex";
        modal.className = modal.className.replace("mui-modal-hide", "");
        modal.className += " mui-modal-show";
        //禁止页面拉动
        modal.addEventListener("touchmove", message.preventDefault, false);
    }

    //显示modal，通过动画的形式
    message.closeModal = function(modal) {
        modal.className = modal.className.replace("mui-modal-show", "");
        modal.className += " mui-modal-hide";
        //禁止页面拉动
        modal.removeEventListener("touchmove", message.preventDefault, false);
        modal.querySelector(".mui-dialog").removeEventListener("webkitAnimationEnd", message.removeModal, false);
        modal.querySelector(".mui-dialog").addEventListener("webkitAnimationEnd", message.removeModal, false);
    }

    //alert
    message.alert = function(o, callback) {
        var title = o.title || defaultDialogTitle,
            callback = callback && typeof callback === "function" ? callback : "";

        var buttons = [];
        buttons[0] = o.buttons && o.buttons instanceof Array ? o.buttons[0] : defaultButtonOkTitle;

        message.modal({
            title: title,
            msg: o.msg,
            buttons: buttons,
            callback: callback
        });
        return false;
    }

    //comfirm
    message.confirm = function(o, callback) {
        var title = o.title || defaultDialogTitle,
            callback = callback && typeof callback === "function" ? callback : "";

        var buttons = [];
        buttons[1] = o.buttons && o.buttons instanceof Array ? o.buttons[1] : defaultButtonOkTitle;
        buttons[0] = o.buttons && o.buttons instanceof Array ? o.buttons[0] : defaultButtonCancelTitle;
        message.modal({
            title: title,
            msg: o.msg,
            buttons: buttons,
            callback: callback
        });
        return false;
    }

    //toast
    message.toast = function(o) {
        return message.modal({
            msg: o.msg,
            type: "toast",
            duration: o.duration || 2000,
            callback: o.callback || ""
        });
    }

    Mui.message = message;
}();

/*==================== start ====================*/

/**
 *   calendar
 **/
/*==================== start ====================*/
; + function() {
    // "use strict";
    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    // 例子：
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
    Date.prototype.Format = function(fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    function $(el, w) {
        var el;
        w ? el = w.querySelector(el) : el = document.querySelector(el);
        return el;
    }

    function Calendar(options) {
        var _c = this;
        var options = options ? options : {};
        this.options = options;

        var _default = {
            monthsName: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            daysName: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
            value: options.value ? new Date(options.value) : new Date(),
            firstDayIndex: 0, //表示从星期天开始,
            rows: 6,
            cols: 7,
            showCalendar: this.options.showCalendar ? true : false, //默认隐藏日历，若设置为true,则必须要有父容器
            showCalendarWrapper: this.options.showCalendarWrapper ? this.options.showCalendarWrapper : $("body")
        }
        this.default = _default;

        this.generateTotalHtml();

        this.setValue(this.default.value);

        this.addTouchEvent();

        //选择的值
        this.selectedValue = _default.value;
    };

    //日历所需要的其他元素
    Calendar.prototype.generateTotalHtml = function() {
        var calendarEle = document.createElement("div");
        calendarEle.className = "mui-calendar";
        calendarEle.id = "mui-calendar";

        if (this.default.showCalendar) {
            calendarEle.className += " mui-calendar-show";
        }

        var _html = '<div class="mui-calendar-toolbar">';
        _html += '<div class="mui-calendar-toolbar-year mui-calendar-toolbar-h"><a href="javascript:void(0)" class="mui-calendar-toolbar-year-prev">';
        _html += ' <i class="mui-iconfont mui-icon-back"></i></a><label class="mui-label">' + this.default.value.getFullYear() + '</label>';
        _html += '<a href="javascript:void(0)" class="mui-calendar-toolbar-year-next"><i class="mui-iconfont mui-icon-right"></i></a></div>';
        _html += ' <div class="mui-calendar-toolbar-month  mui-calendar-toolbar-h"><a href="javascript:void(0)" class="mui-calendar-toolbar-month-prev">';
        _html += '<i class="mui-iconfont mui-icon-back"></i></a> <label class="mui-label">' + this.default.monthsName[this.default.value.getMonth()] + '</label>';
        _html += '<a href="javascript:void(0)" class="mui-calendar-toolbar-month-next"><i class="mui-iconfont mui-icon-right"></i></a></div></div>';
        _html += '<div class="mui-calendar-weeks"><ol>';

        for (var i = 0; i < 7; i++) {
            _html += '<li class="mui-calendar-weeks-day">' + this.default.daysName[i] + "</li>";
        }

        _html += '</ol></div><div class="mui-calendar-months" id="mui-calendar-months"><div class="mui-calendar-months-wrapper">';
        _html += '</div>';

        calendarEle.innerHTML = _html;

        this.default.showCalendarWrapper.appendChild(calendarEle);
        this.calendarEle = calendarEle;
    }


    //计算日历的天数
    //生成一页之中需要的数组
    Calendar.prototype.generateMonthData = function(date, type) {
        var _currDate = date,
            _isCurrDate = false;

        if (_currDate.getFullYear() == new Date().getFullYear() && _currDate.getMonth() == new Date().getMonth()) {
            _isCurrDate = true; //说明当天也在这个月里面，需要高亮显示
        }

        //得到这个月的所有的年月日
        var _fullYear = _currDate.getFullYear(),
            _fullMonth = _currDate.getMonth(), //月份从0开始
            _fullDay = _currDate.getDate();

        //获取本月的1号是星期几,
        _currDate.setDate(1);
        var _weekDay = _currDate.getDay();

        //算出上个月有多少天，将这个月设置为第0天，然后默认退回到上个月的最后一天
        _currDate.setDate(0);
        var _preCountDay = _currDate.getDate();

        //获取这个月有多少天， 做法将月份加1, 但是其实加2，因为算上个月的时候已经又退回一个月了，然后将天数设置为第0天，这样会默认退回到上个月的最后一天
        _currDate.setDate(1);
        var _getCurrMonth = _currDate.getMonth();
        _currDate.setMonth(_getCurrMonth + 2);
        _currDate.setDate(0);

        var _currCountDay = _currDate.getDate();

        //获取这个月最后一天是星期几
        var _lastWeekDay = _currDate.getDay();

        //算出上个月最后几天和下个月的最后几天的数组,用于填充数据
        var _preDayArray = [],
            _nextDayArray = [],
            _currDayArray = [];

        var _preDate = new Date(_fullMonth - 1 < 0 ? _fullYear - 1 : _fullYear, _fullMonth - 1 < 0 ? 11 : _fullMonth - 1, 1),
            _preDateFullYear = _preDate.getFullYear(),
            _preDateFullMonth = _preDate.getMonth();

        var _nextDate = new Date(_fullMonth + 1 >= 12 ? _fullYear + 1 : _fullYear, _fullMonth + 1 >= 12 ? 0 : _fullMonth + 1, 1),
            _nextDateFullYear = _nextDate.getFullYear(),
            _nextDateFullMonth = _nextDate.getMonth();

        var selectDay = false, //用于显示选中的日期
            today = false;
        for (var i = _weekDay - 1; i >= 0; i--) {
            _preDayArray.push({
                day: _preCountDay - i,
                today: today,
                selectDay: selectDay,
                type: "p",
                year: _preDateFullYear,
                month: _preDateFullMonth
            });
        }
        for (var m = 1; m <= _currCountDay; m++) {
            selectDay = false;
            today = false;

            if (_isCurrDate && m == new Date().getDate()) {
                today = true;
            }

            if (_currDate === this.selectedValue) {
                selectDay = true;
            }

            _currDayArray.push({
                day: m,
                type: "c",
                today: today,
                selectDay: selectDay,
                year: _fullYear,
                month: _fullMonth
            });
        }

        for (var j = 1; j <= 43 - (_preDayArray.length + _currCountDay); j++) {
            _nextDayArray.push({
                day: j,
                type: "n",
                today: today,
                selectDay: selectDay,
                year: _nextDateFullYear,
                month: _nextDateFullMonth
            });
        }

        //显示在这个月中所有的数据集合
        _currDayArray = _preDayArray.concat(_currDayArray, _nextDayArray);

        this.monthTemplate(_currDayArray, date, type);
    }

    //创建月份模板
    Calendar.prototype.monthTemplate = function(datas, date, type) {
        if (!(datas instanceof Array) || !date) {
            Mui.message.alert({
                msg: "数据不合法，必须为数组"
            });
            return false;
        }
        var _fullYear = date.getFullYear(),
            _fullMonth = date.getMonth(),
            _fullDay = date.getDate();

        var _monthNode = document.createElement("div");
        _monthNode.className = "mui-calendar-month";
        _monthNode.setAttribute("data-month", _fullMonth);
        _monthNode.setAttribute("data-year", _fullYear);

        var _default = this.default;
        var _index = 0,
            _className = "",
            _html = "";
        if (type == "curr") {
            _className += "mui-calendar-month-current";
        } else if (type == "prev") {
            _className += "mui-calendar-month-prev";
        } else if (type == "next") {
            _className += "mui-calendar-month-next";
        }
        _monthNode.className += " " + _className;
        for (var i = 0; i < _default.rows; i++) {
            _html += "<ol class='mui-calendar-month-row'>";
            for (var j = 0; j < _default.cols; j++) {
                var _class = "";
                if (datas[_index].type == "p") {
                    _class += "mui-calendar-month-prevday";
                } else if (datas[_index].type == "n") {
                    _class += "mui-calendar-month-nextday";
                }

                if (datas[_index].type == "c" && datas[_index].selectDay) {
                    _class += " mui-calendar-month-selected";
                }

                if (datas[_index].today) {
                    _class += " mui-calendar-month-today";
                }

                _html += '<li class="mui-calendar-month-day ' + _class + '" data-day="' + datas[_index].day + '" data-date="' + datas[_index].year + "-" + (datas[_index].month + 1) + "-" + datas[_index].day + '" data-month="' + datas[_index].month + '" data-year="' + datas[_index].year + '"><span>' + datas[_index].day + '</span></li>';

                _index++;
                if (_index % 7 === 0) {
                    _html += "</ol>";
                }
            }
        }
        _monthNode.innerHTML = _html;

        var wrapper = $(".mui-calendar-months-wrapper", this.calendarEl);

        if (type == "curr") {
            wrapper.appendChild(_monthNode);
        } else if (type == "prev") {
            var currentMonth = $(".mui-calendar-month-current");
            wrapper.insertBefore(_monthNode, currentMonth);
        } else if (type == "next") {
            wrapper.appendChild(_monthNode);
        }
    }

    //设置时间
    Calendar.prototype.setValue = function(value, type) {
        //设置时间之后，需要清空所有日历，重新添加日历
        var wrapper = $(".mui-calendar-months-wrapper");
        wrapper.innerHTML = "";
        wrapper.setAttribute("style", "");

        //需要滚动，所以自动加载前一个月和后一个月
        var value = !value ? this.default.value : value instanceof Date ? value : new Date(value);

        var _fullYear = value.getFullYear(),
            _fullMonth = value.getMonth(),
            _fullDay = value.getDate();


        var _preDate = new Date(_fullMonth - 1 < 0 ? _fullYear - 1 : _fullYear, _fullMonth - 1 < 0 ? 11 : _fullMonth - 1, 1),
            _nextDate = new Date(_fullMonth + 1 >= 12 ? _fullYear + 1 : _fullYear, _fullMonth + 1 >= 12 ? 0 : _fullMonth + 1, 1);


        this.generateMonthData(value, "curr");
        this.generateMonthData(_preDate, "prev");
        this.generateMonthData(_nextDate, "next");
    }

    //touchmove时，日历滚动
    Calendar.prototype.addTouchEvent = function() {
        var _this = this;
        var touch = {
            init: function() {
                //事件作用元素
                this.calendar = $("#mui-calendar");
                touch.wrapper = $("#mui-calendar-months", touch.calendar);
                touch.wrapperHandler = $(".mui-calendar-months-wrapper", touch.wrapper);
                touch.toolbarYear = $(".mui-calendar-toolbar-year .mui-label");
                touch.toolbarMonth = $(".mui-calendar-toolbar-month .mui-label");
                //距离换算
                touch.startX = 0;
                touch.endX = 0;
                touch.distance = 0;

                //添加事件
                touch.on();
            },
            on: function() {
                touch.wrapper.addEventListener("touchstart", touch.start);

                touch.wrapper.addEventListener("touchmove", touch.move);

                touch.wrapper.addEventListener("touchend", touch.end);
            },
            off: function() {
                touch.wrapper.removeEventListener("touchstart", touch.start);

                touch.wrapper.removeEventListener("touchmove", touch.move);

                touch.wrapper.removeEventListener("touchend", touch.end);
            },
            start: function(e) {
                if (touch.running) {
                    return false;
                }
                touch.running = true;
                touch.startX = e.targetTouches[0].pageX;
                touch.endX = touch.endX;
                e.preventDefault();
                touch.startTime = new Date().getTime();
            },
            move: function(e) {
                if (!touch.running) return;
                touch.endX = e.targetTouches[0].pageX;
                touch.distance = touch.endX - touch.startX;
                touch.wrapperHandler.style.webkitTransitionDuration = "0ms";
                touch.wrapperHandler.style.webkitTransform = "translateX(" + touch.distance + "px)";
                e.preventDefault();
            },
            end: function() {
                var _half = Math.floor(Mui.device.winWidth / 3),
                    _translate = 0;
                if (touch.distance === 0) {
                    touch.running = false;
                    return false;
                }
                touch.endTime = new Date().getTime();
                if (touch.endTime - touch.startTime < 200) {
                    if (touch.distance > 10) {
                        _translate = 1;
                    } else if (touch.distance < -10) {
                        _translate = -1;
                    }
                } else {
                    if (touch.distance < 0) {
                        touch.distance < -_half ? _translate = -1 : _translate = 0;
                    } else {
                        touch.distance < _half ? _translate = 0 : _translate = 1;
                    }
                }


                //动画形式切换到某个月份或者停留在当月
                touch.wrapperHandler.style.webkitTransitionDuration = "400ms";
                touch.wrapperHandler.style.webkitTransform = "translateX(" + _translate * 100 + "%)";

                touch.startX = 0;
                touch.endX = 0;
                touch.distance = 0;
                touch.endY = 0;
                touch.startY = 0;

                setTimeout(function() {
                    touch.running = false;
                    touch.generateMonth(_translate);
                }, 400);
            },
            generateMonth: function(delta) { //重新再生成新的月份
                if (delta === 0) {
                    return false;
                }
                delta === 1 ? touch.updateDate($(".mui-calendar-month-prev")) : touch.updateDate($(".mui-calendar-month-next"));
            },
            updateDate: function(wrapper) { //更新日历显示
                var year = wrapper.getAttribute("data-year"),
                    month = wrapper.getAttribute("data-month");

                _this.setValue(new Date(year, month, 1));
                touch.toolbarYear.innerHTML = year;
                touch.toolbarMonth.innerHTML = _this.default.monthsName[month];
            }
        }

        touch.init();
    }


    Mui.calendar = Calendar;


}();

/*==================== start ====================*/

// 摇一摇模块

// options: callback
(function() {
    function shakeInit(fn) {
        var last_update = 0;
        var last_x = null;
        var last_y = null;
        var body = null;
        var audio = null;
        var mask = null;
        if (typeof fn !== "function") {
            throw new Error("argument is not a function");
        }
        // 判断是否有事件句柄，添加监听事件
        if (window.DeviceMotionEvent) {
            // 初始化声音，界面
            body = document.querySelector("body");
            audio = document.createElement("audio");
            audio.innerHTML = "<source src='./Public/mall/assets/music.mp3'>"
            mask = document.createElement("div");
            mask.classList.add("mui-shake");
            mask.innerHTML = '<img class="mui-shake-icon" src="./Public/mall/images/shake.png" alt="" />'
            body.appendChild(audio);
            body.appendChild(mask);
            window.addEventListener('devicemotion', deviceMotionHandler, false);
        } else {
            // 如果没有传感器事件，直接执行回调函数
            fn()
        }
        // 传感器回调监听事件
        function deviceMotionHandler(e) {
            // 初始化
            var x = 0;
            var y = 0;
            var acceleration = e.accelerationIncludingGravity;
            var curTime = new Date().getTime();
            if ((curTime - last_update) > 100) {
                var diffTime = curTime - last_update;
                last_update = curTime;
                x = acceleration.x;
                y = acceleration.y;
                if(!last_x || !last_y){
                    last_x = x;
                    last_y = y;
                }
                if (x + y - last_x - last_y > 20) {
                    // 播放音乐
                    audio.play();
                    audio.addEventListener("ended", audioEndHandler, false)
                    window.removeEventListener("devicemotion", deviceMotionHandler, false);
                }
                last_x = x;
                last_y = y;
            }
        }

        function audioEndHandler() {
            body.removeChild(audio);
            body.removeChild(mask);
            audio.removeEventListener("ended", audioEndHandler, false)
            fn();
        }
    }
    Mui.shakeInit = shakeInit;
})()
