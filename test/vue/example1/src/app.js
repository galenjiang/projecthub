new Vue({
  el: "#app",
  data: {
    index: "",
    msg: [{
      name: "a", age: 20, sex: "male"
    }, {
      name: "b", age: 30, sex: "male"
    }, {
      name: "c", age: 10, sex: "female"
    },{
      name: "abc", age: 20, sex: "male"
    }]
  },
  methods: {
    myCustomFilterFunction: function(){
      return "index" + " in " + "'name'"
    }
  }
})
