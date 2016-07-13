import {MessageBox, toast, loading} from './components';
new Vue({
  el: '#demo',
  data: {
    title: 'hello'
  },

  ready: function(){
    loading.show()
  }
})
