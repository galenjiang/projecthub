require.config({
  baseUrl: "module/",
  paths: {
    jquery: "jquery/dist/jquery.min",
    avalon: "avalon-master/dist/avalon.min"
  },
  shim: {
    // jq according to amd style
    // jquery: {
    //   exports: "jquery"
    // },
    avalon: {
      exports: "avalon"
    }
  },
  map:{
    "*": {
      "css": "module/require-css-master/css.js"
    }
  }
})



require(["jquery", "avalon","css!../style.css"], function(jquery) {
  $(function() {
    var conf = {
      gg: [{
        "id": "1",
        "title": "公告文章标题1"
      }, {
        "id": "2",
        "title": "公告文章标题2"
      }, {
        "id": "3",
        "title": "公告文章标题3"
      }, {
        "id": "4",
        "title": "公告文章标题4"
      }],
      bd: [{
        "id": "1",
        "title": "媒体报道文章标题1"
      }, {
        "id": "2",
        "title": "媒体报道文章标题2"
      }, {
        "id": "3",
        "title": "媒体报道文章标题3"
      }, {
        "id": "4",
        "title": "媒体报道文章标题4"
      }]
    };
    // require.config({
    //   baseUrl:　"./",
    //   paths: {
    //     a: "a"
    //   }
    // })
    // require(["a"],function(){
    //
    // })


    // var vm = avalon.define({
    //   $id: "list",
    //   more_name: "gg",
    //   more_text: "更多公告",
    //   gg: avalon.mix(true, [], conf.gg),
    //   bd: avalon.mix(true, [], conf.bd),
    //   infoList: conf.gg,
    //   changeUl: function(flag) {
    //     if (flag) {
    //       vm.more_name = "gg";
    //       vm.more_text = "更多公告";
    //       vm.infoList = vm.gg;
    //     } else {
    //       vm.more_name = "bd";
    //       vm.more_text = "更多报道";
    //       vm.infoList = vm.bd;
    //     }
    //   }
    // });
    // avalon.scan();


  })
})
