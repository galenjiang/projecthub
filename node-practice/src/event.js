const EventEmitter = require('events');

const ev = new EventEmitter();

ev.on('hello', () => {console.log(1)})
ev.on('hello', () => {console.log(2)})
// ev.emit('hello')
const a = {a: {b: 1}}
console.log(a)
console.log(ev.listenerCount('hello'))
