require("./nd.base.css")

// alert框显示
var mod = {}
var a = {
  show: function(o) {
    var t = 0,
      popup = $("#_z_alert_");
    if (popup.length) {
      popup.addClass("out");
      t = 200;
    }
    if (t == 0) {
      mod._alert.show(o);
    } else {
      setTimeout(function() {
        popup.remove();
        mod._alert.show(o);
      }, t);
    }
  },
  hide: function(cb) {
    var popup = $("#_z_alert_");
    popup.addClass("out").find(".popup .btns .y, .popup .btns .n").off();
    if (typeof cb == "function") {
      cb();
    }
    setTimeout(function() {
      popup.off().remove();
    }, 200);
    delete mod._alert._o;
  }
};



mod._alert = {
  show: function(o) {
    $("input:focus").blur();
    if (o != undefined && typeof o != "object") {
      o = {
        txt: o
      };
    } else if (o == undefined) {
      o = "undefined";
    }
    mod._alert._o = o;
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
    $("#_z_alert_").on("touchstart", mod._preventDefault);
    popup.find(".popup>.btns .y, .popup>.btns .n, .popup>.close").on("touchstart", mod._alert.touchstart).on("touchmove", mod._alert.touchmove).on("touchend", mod._alert.click);
  },
  touchstart: function(e) {
    mod._alert.mouseX = e.originalEvent.changedTouches[0].pageX;
    mod._alert.mouseY = e.originalEvent.changedTouches[0].pageY;
    mod._alert.mouseMove = false;
    $(this).attr("hover", "true");
  },
  touchmove: function(e) {
    var x = e.originalEvent.changedTouches[0].pageX;
    var y = e.originalEvent.changedTouches[0].pageY;
    if ((Math.abs(x - mod._alert.mouseX) > 10 || Math.abs(y - mod._alert.mouseY) > 10) && !mod._alert.mouseMove) {
      mod._alert.mouseMove = true;
      $(this).removeAttr("hover");
    }
  },
  click: function() {
    $(this).removeAttr("hover");
    if (!mod._alert.mouseMove) {
      var _th = $(this);
      if (_th.hasClass("y")) {
        a.hide(mod._alert._o.callbackY || mod._alert._o.callback);
      } else {
        a.hide(mod._alert._o.callbackN);
      }
    }
    return false;
  }
};


export {a}
