/**
 * Created by admin on 2015/8/27.
 */

define(function (require, exports, module) {
  var nd = require("unit/nd.base");
  require("unit/jq.$touch");
  require("unit/jq.$pageTo");


  $(function () {

    $.extend({
      isLogin: function () {
        $.ajax({
          url: "/index.php?m=South&c=Show&a=overdue",
          dataType: "text",
          success: function (str) {
            if (str != 1) {
              window.location.href = "./login.html"
            }
          },
          error: function (e) {
            //返回失败
          }
        });
      }
    });

    var app = {};
    app.init = function () {
      $("footer li:nth-child(1)").touchend(function () {
        window.location.href = "./index.html";
      });
      $("footer li:nth-child(2)").touchend(function () {
        window.location.href = "./garage.html";
      });
      $("footer li:nth-child(3)").touchend(function () {
        window.location.href = "./cart.html";
      });
      $("footer li:nth-child(4)").touchend(function () {
        window.location.href = "./order.html";
      });
      $("footer li:nth-child(5)").touchend(function () {
        window.location.href = "./info.html";
      })
    };

    app.init();

  });


});


