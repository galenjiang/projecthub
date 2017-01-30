/**
 * Created by admin on 2015/9/21.
 */
require.config({
  baseUrl:"../",
  paths: {
    "domReady": "node_modules/requirejs/domready",
    "avalon": "avalon/dist/avalon.shim",
    "mmHistory": "avalon/mmRouter-master/mmHistory",
    "mmRouter": "avalon/mmRouter-master/mmRouter",
    "jquery": "node_modules/jquery/dist/jquery"
  },
  shim: {
    "avalon": {"exports": "avalon"},
  }
});
require(["domReady!","avalon","mmHistory","mmRouter","jquery"],function(){
  var vm = avalon.define({
    $id: "user",
    username:conf.username,
    pageUrl: "./mine.html"
  });

  function callback() {
    console.log(this.path);
      var path_tail = this.path.replace(/\//, "");
    console.log(path_tail)
      vm.pageUrl = "./" + path_tail + ".html";  //动态修改pageUrl属性值
    $(".click").click(function(){
      alert(1)
    })
  }
  avalon.router.get("/routerpartitials/{path:.*}", callback); //劫持url hash并触发回调
  avalon.history.start(); //历史记录堆栈管理

  avalon.scan();

});
