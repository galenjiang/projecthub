var str = 'idadalo1jada991j31j3iz9cajaed';

var reg = /\w(\d)/g;

//function output(){
//    var res = reg.exec(str);
//    console.log(this)
//    if(res){
//        console.log(res);
//        output()
//    }
//}
//
//output();




//var res = str.match(reg,function(el){
//    console.log(1)
//});
//
//console.log(res);
//var newStr = str.replace(reg, function (a, b, c, d){
//    console.log(a,b,c,d);
//   return  a
//});
//console.log(newStr);

function Person(){

}
var p = new Person();

console.log(Object.getPrototypeOf(p) == Person.prototype);
console.log(p.__proto__ == Person.prototype);

