/*
 * 引入Commonjs模块 示例
 *
 */

 /*
 var component2 = require('./component2');
component2();
*/

(function(window){
    var document = window.document;
    var common = require('../common/common').common;
    var utils = require('../common/utils').utils;
    common.init();



})(window,document)
