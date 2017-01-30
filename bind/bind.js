/**
 * Created by admin on 2016/4/29.
 */
var a = 1;
var obj = {
    a: 2
};
Function.prototype.bind = function(obj){
    var self = this;
    function bapply(){
        return self.apply(obj, Array.prototype.slice.call(arguments,1))
    }
    return bapply
};
function show(){
    console.log('aaa')
}
show();
//show.bind(b)();