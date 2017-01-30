/**
 * Created by Galen on 2016/6/26.
 */

/*
 * class extend
 */

module.exports = function(sub, sup){
    function Fn(){}
    Fn.prototype = sup.prototype;
    sub.prototype = new Fn();
    sub.prototype.constructor = sub;
    sub.superClass = sup;
    if(sup.prototype.constructor === Object.prototype.constructor){
        sup.prototype.constructor = sup;
    }
};