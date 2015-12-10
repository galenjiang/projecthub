// var $ = require("jquery");
$(function(){
  var scope = {
    index: 2
  }
  var page = {
    init: function(){
      // page.cons();
      page.initFontSize()
    },
    cons: function(){
      console.log(scope.index);
    },
    initFontSize: function(){
    }
  }
  page.init();
})

new vue({
  el: "#content",
  data: {
    name: "galen",
    mb: "13564071438"
  },
  methods: {
    clickme: function(){
      alert(this.name +　"真棒！");
    }
  }
})
