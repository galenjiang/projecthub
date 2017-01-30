/**
 * Created by admin on 2015/9/21.
 */

require.config({
  baseUrl: '../',
  paths: {
    "domReady": "node_modules/requirejs/domready",
    "avalon": "avalon/dist/avalon.shim"

  },
  shim: {
    exports: "avalon"
  }
});
require(['avalon',"domReady!"], function() {
  var vm = avalon.define({
    $id: "list",
    more_name: "gg",
    more_text: "更多公告",
    gg:conf.gg,
    bd:conf.bd,
    infoList:conf.gg,
    changeUl:function(flag){
      if(flag){
        vm.more_name = "gg";
        vm.more_text = "更多公告";
        vm.infoList = avalon.mix(true,[],vm.gg);
      }else{
        vm.more_name = "bd";
        vm.more_text = "更多报道";
        vm.infoList = avalon.mix(true,[],vm.bd);
      }
    }
  });
  avalon.scan();
});