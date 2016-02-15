function Util() {
  this.mod = {}
}

//options url data type timeout success error
Util.prototype.ajax = function({
    url: null,
    data: {},
    type: "get",
    timeout: 0,
    dataType: "string"
  }) {
    if (!url) {
      throw new Error("the parameter, url is not exist")
    }

    let arr = [];
    data.t = Math.random();
    for (let name in data) {
      arr.push(name + "=" + encodeURIComponent(data[name]));
    }
    let str = arr.join("&");

    //1 创建
    if (window.XMLHttpRequest) {
      let xhr = new XMLHttpRequest();
    } else {
      let xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    //2 连接
    //3 发送
    if (type == "get") {
      xhr.open("get", url + "?" + str, true);
      xhr.send();
    } else {
      xhr.open("post", url, true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send(str);
    }

    //4 接收
    xhr.onreadystatechange = function() {

      if (xhr.readyState == 4) { //完成
        clearTimeout(timer);
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) { //成功
          if (dataType === "json") {
            let oJson = JSON.parse(xhr.responseText);
            success && success(oJson);
          } else if (dataType === "string") {
            success && success(oJson);
          } else {
            throw new Error(`can not deal with datatype:${dataType}`);
          }


        } else { //失败
          error && error(xhr.status);
        }
      }
    };

    //超时
    if (timeout) {
      var timer = setTimeout(function() {
        xhr.abort();
      }, timeout);
    }
  }
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
Util.prototype.preventMediaDefault = function() {
    document.addEventListener('touchmove', function(e) {
      e.preventDefault();
    }, false);
  }
  // 设置cookie
Util.prototype.setCookie = function(name, value, expires, path, domain, secure) {
    let today = new Date();
    today.setTime(today.getTime());
    if (expires) {
      expires = expires * 1000 * 60 * 60 * 24;
    }
    let expires_date = new Date(today.getTime() + (expires));
    document.cookie = name + '=' + escape(value) + ((expires) ? ';expires=' + expires_date.toGMTString() : '') + ((path) ? ';path=' + path : '') + ((domain) ? ';domain=' + domain : '') + ((secure) ? ';secure' : '');
  }
  // 删除cookie
Util.prototype.deleteCookie = function(name, path, domain) {
    if (this.getCookie(name)) {
      document.cookie = name + '=' + ((path) ? ';path=' + path : '') + ((domain) ? ';domain=' + domain : '') + ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
    }
  }
  // 设置localstorage
Util.prototype.setStorage = function(name, value) {
    localStorage.setItem(name, value);
  }
  // 获取localstorage
Util.prototype.getStorage = function(name) {
    return localStorage.getItem(name);
  }
  // 删除localstorage
Util.prototype.deleteStorage = function(name) {
    localStorage.removeItem(name);
  }
  // 删除所有localstorage
Util.prototype.deleteAllStorage = function() {
  localStorage.clear();
}
let util = new Util();

export default util;
