$(() => {
  let page = {
    init: function(){
      let oDiv1 = document.querySelector("#div1")
      let oDiv2 = document.querySelector("#div2")
      document.addEventListener("readystatechange",function(event){
        alert(document.readyState)
      },false)
    },
    methods1: function({a = 1, b = 1} = {}){
      return a + b
    },
    methods2: ({a = 0, b = 0} = {}) => a + b
  }
  page.init()
})
