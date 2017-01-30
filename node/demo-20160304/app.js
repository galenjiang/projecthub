function Person(name){
  this.name = name
  return {name: "world"}
}
Person.bind({})
var p1 = new Person("galen");
console.log(p1.name);
