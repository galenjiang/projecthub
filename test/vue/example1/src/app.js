Vue.directive('demo', {
  bind: function () {
    console.log('demo bound!')
  },
  update: function (value) {
    console.log()
  }
})

var demo = new Vue({
  el: '#demo',
  data: {
    msg: 'hello!'
  }
})

var vm = new Vue({
  el: "#app"
})
