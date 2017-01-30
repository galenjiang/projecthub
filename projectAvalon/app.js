require.config({
    baseUrl: "./",
    paths:{
        avalon: "avalon.shim",
        domReady: "domReady",
        jquery: "jquery",
        mmRouter: "mmRouter",
        mmHistory: "mmHistory"
    },
    shim: {
        avalon: {exports: "avalon"},
        mmRouter: {deps: ["avalon"]},
        mmHistory: {deps: ["avalon"]}
    }
});
require(['mmRouter','mmHistory',"domReady!"], function () {
    var vm = avalon.define({
        $id: "user",
        username :conf.username,
        pageUrl: "mine.html",
        rendered: function(){
            console.log("rendered")
        }
    });


    function cb(){
        if(this.path == "/"){
            vm.pageUrl = "mine.html";
        }else{
            vm.pageUrl = this.path.substring(1) + ".html";
        }

    }


    avalon.router.get("/*path", cb);
    avalon.history.start();
    avalon.scan();
})
