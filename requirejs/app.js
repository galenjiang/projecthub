require.config({
  baseUrl: "node_modules",
  paths: {
    "jquery": "jquery/dist/jquery.min",
    "a": "a"
  }
})
require(["jquery","a"],function($,a){
  $(function(){
    console.log(a.b)
  })
})
