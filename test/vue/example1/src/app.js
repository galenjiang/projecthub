Vue.directive("yield",{
  bind: function(){
    alert("绑定")
  },
  update: function(newV, oldV){
    console.log('新值：'+newV+'旧值：'+oldV);
  }
})

var child = Vue.extend({
  template: "#child",
  data: function(){
    return {
      a: "child's data"
    }
  },
  methods: {
    click: function(){
      console.log(this.$el.textContent)
    }
  }
})
var parent = Vue.extend({
  template: "#parent",
  components: {
    "child": child
  },
  data: function(){
    return {
      a: "parent's data"
    }
  }
})
// Vue.component("child", child)
Vue.component("parent", parent);


var vm = new Vue({
  el: '#app',
  data: {
    a: "root"
  },
  methods: {

  }
})
