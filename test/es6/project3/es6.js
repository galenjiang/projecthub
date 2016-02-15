function * helloWorldGenerator() {
  console.log("1")
  let b = 0;
  function a(){
    return setTimeout(function(){
      b = 2;
    },3000);
  }
  yield a()
  yield console.log(b)
  return;
}

var hw = helloWorldGenerator();
hw.next()
hw.next()
