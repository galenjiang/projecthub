require("commons");
var com = require("./templ/com1.vue");
new Vue({
  el: "#app",
  data: {
    msg: "hello world",
  },
  methods: {
    clickme: function(){
      alert(this.name +　"真棒！");
    }
  },
  components: { 
    com: com
  }
})
