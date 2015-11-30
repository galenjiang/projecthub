$(function(){
  var scope = {
    index: 1
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
    click: function(){
      alert("你好！")
    }
  }
})
