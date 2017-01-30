$(function(){
  function Page(){}

  Page.prototype = {
    addA: function(value){
      this.scope.newLetter += value
      this.scope.a = "newA"
      return this
    },
    addB: function(value){
      this.scope.newLetter += value
      this.scope.b = "newB"

      return this
    },
    logout: function(){
      console.log(this.scope.a)
      console.log(this.scope.b)
      console.log(this.scope.newLetter)
      return this
    }

  }
  var page = new Page()
  page.scope = {
    a: "aaa",
    b: "bbbb",
    newLetter: ""
  }
  page.init = function(){
    page.addA("a")
        .addB("b")
        .logout();
  }
  page.init()


})
