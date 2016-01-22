function Util(){
	this.mod = {}
}

//options url data type timeout success error
Util.prototype.ajax = function(options){

	options = options || {};
	if(!options.url){
		return;
	}
	options.data = options.data || {};
	options.type = options.type || "get";
	options.timeout = options.timeout || 0;
	options.dataType = options.dataType || "str"


	var arr = [];
	options.data.t = Math.random();
	for(var name in options.data){
		arr.push(name + "=" + encodeURIComponent(options.data[name]));
	}
	var str = arr.join("&");

	//1 创建
	if(window.XMLHttpRequest){
		var xhr = new XMLHttpRequest();
	} else {
		var xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}

	//2 连接
	//3 发送
	if(options.type == "get"){
		xhr.open("get",options.url + "?" + str,true);
		xhr.send();
	} else {
		xhr.open("post",options.url,true);
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xhr.send(str);
	}

	//4 接收
	xhr.onreadystatechange = function(){

		if(xhr.readyState == 4){//完成
			clearTimeout(timer);
			if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){//成功
				if(options.dataType === "json"){
					var oJson = JSON.parse(xhr.responseText)
				}
				options.success &&　options.success(oJson);


			} else {//失败
				options.error &&　options.error(xhr.status);
			}
		}
	};

	//超时
	if(options.timeout){
		var timer = setTimeout(function(){
			xhr.abort();
		},options.timeout);
	}

}
Util.prototype.alert = {
  show: function(o) {
		require("./nd.base.css");
    var t = 0,
      var popup = document.querySelector("#_z_alert_");
    if (popup) {
      popup.classList.add("out");
      t = 200;
    }
    if (t == 0) {
      util._alert.show(o);
    } else {
      setTimeout(function() {
        popup.remove();
        util._alert.show(o);
      }, t);
    }
  },
  hide: function(cb) {
    var popup = document.querySelector("#_z_alert_");
    popup.classList.add("out")
		$(popup).find(".popup .btns .y, .popup .btns .n").off();
    if (typeof cb == "function") {
      cb();
    }
    setTimeout(function() {
      popup.off().remove();
    }, 200);
    delete util._alert._o;
  }
};
Util.prototype._alert = {
  show: function(o) {
    $("input:focus").blur();
    if (o != undefined && typeof o != "object") {
      o = {
        txt: o
      };
    } else if (o == undefined) {
      o = "undefined";
    }
    util._alert._o = o;
    o.class = o.class ? o.class : "";
    o.title = o.title ? o.title : "提示";
    o.txt = o.txt || o.text;
    var html = "<div id='_z_alert_' class='" + o.class + "'><div class='popup'>";
    html += "<h1>" + o.title + "</h1><a href='javascript:viod(0)' class='close'></a><div class='p'><p>" + o.txt + "</p></div>";
    html += "<div class='btns'>";
    if (o.btnN) {
      html += "<a href='javascript:void(0)' class='alertbtn n'>" + o.btnN + "</a>";
    }
    o.btnY = o.btnY ? o.btnY : o.btn ? o.btn : "确定";
    html += "<a href='javascript:void(0)' class='alertbtn y'>" + o.btnY + "</a></div></div>";
    $("body").append(html);
    var popup = $("#_z_alert_");
    setTimeout(function() {
      popup.addClass("show");
    }, 0);
    $("#_z_alert_").on("touchstart", util._preventDefault);
    popup.find(".popup>.btns .y, .popup>.btns .n, .popup>.close").on("touchstart", util._alert.touchstart).on("touchmove", util._alert.touchmove).on("touchend", util._alert.click);
  },
  touchstart: function(e) {
    util._alert.mouseX = e.originalEvent.changedTouches[0].pageX;
    util._alert.mouseY = e.originalEvent.changedTouches[0].pageY;
    util._alert.mouseMove = false;
    $(util).attr("hover", "true");
  },
  touchmove: function(e) {
    var x = e.originalEvent.changedTouches[0].pageX;
    var y = e.originalEvent.changedTouches[0].pageY;
    if ((Math.abs(x - util._alert.mouseX) > 10 || Math.abs(y - util._alert.mouseY) > 10) && !util._alert.mouseMove) {
      util._alert.mouseMove = true;
      $(util).removeAttr("hover");
    }
  },
  click: function() {
    $(util).removeAttr("hover");
    if (!util._alert.mouseMove) {
      var _th = $(util);
      if (_th.hasClass("y")) {
        util.alert.hide(util._alert._o.callbackY || util._alert._o.callback);
      } else {
        util.alert.hide(util._alert._o.callbackN);
      }
    }
    return false;
  }
};
// 加载
Util.prototype.ready = function(fn) {
    if (document.readyState != 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }
// reload images
Util.prototype.imgPreload = function(arr) {
	arr.forEach((el) => {
		console.log(el)
		let oImg = document.createElement("img");
		oImg.src = el
	})
}
// 富媒体阻止滚动
Util.prototype.preventMediaDefault = function(){
	document.addEventListener('touchmove', function(e) {
		e.preventDefault();
	}, false);
}

// 设置cookie
Util.prototype.setCookie = function(name, value, expires, path, domain, secure){
	var today = new Date();
		today.setTime(today.getTime());
		if (expires) {
				expires = expires * 1000 * 60 * 60 * 24;
		}
		var expires_date = new Date(today.getTime() + (expires));
		document.cookie = name + '=' + escape(value) + ((expires) ? ';expires=' + expires_date.toGMTString() : '') + ((path) ? ';path=' + path : '') + ((domain) ? ';domain=' + domain : '') + ((secure) ? ';secure' : '');
}
// 删除cookie
Util.prototype.deleteCookie = function(name, path, domain) {
		if (exports.getCookie(name)){
			document.cookie = name + '=' + ((path) ? ';path=' + path : '') + ((domain) ? ';domain=' + domain : '') + ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
		}
}
// 设置localstorage
Util.prototype.setStorage = function(name, value){
	localStorage.setItem(name, value);
}
// 获取localstorage
Util.prototype.getStorage = function(name){
	return localStorage.getItem(name);
}
// 删除localstorage
Util.prototype.deleteStorage = function(name){
	localStorage.removeItem(name);
}
// 删除所有localstorage
Util.prototype.deleteAllStorage = function(){
	localStorage.clear();
}
let util = new Util();

export { util }
