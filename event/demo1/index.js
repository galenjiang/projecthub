'use strict'
/**
 * Created by admin on 2016/7/1.
 */
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
function fn(e) {
    console.log(e.a)
}
myEmitter.on('alert',fn);
myEmitter.emit('alert',{a: 'hello'});
myEmitter.removeListener('alert',fn)
myEmitter.emit('alert',{a: 'world'});