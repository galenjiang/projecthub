Vue.config.debug = true

// Vue.transition('fade',{
//   beforeEnter: function(){
//     console.log(111)
//   },
//   beforeLeave: function(){
//     console.log(222)
//   }
// })

Vue.transition('expand', {

  beforeEnter: function (el) {
    console.log(111)
  }
})

new Vue({
  el: '#app',
  data: {
    checkedNames: [],
    testShow: true
  },
  methods: {
    change: function(){
      this.testShow ? this.testShow = false : this.testShow = true
    }
  }

})
