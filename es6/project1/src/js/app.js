$(() => {
  let page = {

    init: function() {
      let dom = document.querySelector("#div");
      // dom.onclick = function(){
      //   alert(2)
      // }

      alert()
      console.log(dom.getAttribute(`onclick`))
    },
    methods1: function({
      a = 0, b = 0
    } = {}) {
      return a + b
    },
    methods2: ({a = 0, b = 0} = {}) => a + b
  }
  page.init()
})
