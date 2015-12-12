require("commons")
new Vue({
  el: "#app",
  data: {
    msg: "hello world",
  },
  methods: {
    clickme: function(){
      alert(this.name +　"真棒！");
    }
  }
})
