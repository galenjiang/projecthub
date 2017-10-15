title: rxjs入门
speaker: 蒋杰
url: undefined
transition: slide

[slide]
# 一天学通系列之Rxjs

[slide]
## 用来干嘛的？
做数据处理的 {:&.moveIn}

[slide]
* lodash

[slide]
## 库的优点
  * lodash
    * 函数式的风格，减少代码组织成本，用更抽象的方式来写代码
    * map reduce，内部优化，惰性求值，shortcut fusion，减少迭代
[slide]
## 痛点呢？
* 全局变量，暴露变量来维护状态 {:&.moveIn}
* 同步式的代码，前端不仅通过后端拿到数据，还需要对数据做时间上处理

[slide]
## throttle
```javascript
let count = 0;
const rate = 1000;
let lastClick = Date.now() - rate;
const button = document.querySelector('button');
button.addEventListener('click', () => {
  if (Date.now() - lastClick >= rate) {
    console.log(`Clicked ${++count} times`);
    lastClick = Date.now();
  }
});
```

[slide]
```javascript
let count = 0
const clickHandler = _.throttle(() => {
  count =+ 1
  console.log(`Clicked ${++count} times`)
}, 1000)
const button = document.querySelector('button');
button.addEventListener('click',clickHandler)
```

[slide]
```javascript
const clickHandler = (() => {
  let count = 0
  return _.throttle(() => {
    count =+ 1
    console.log(`Clicked ${++count} times`)
  }, 1000)
})()
const button = document.querySelector('button');
button.addEventListener('click',clickHandler)
```

[slide]
```javascript
const button = document.querySelector('button');
Rx.Observable.fromEvent(button, 'click')
  .throttleTime(1000)
  .scan(count => count + 1, 0)
  .subscribe(count => console.log(`Clicked ${count} times`));
```

[slide]
## 引入rxjs,有什么好处呢？
rxjs是观察者(准确来说是pubsub)与iterator模式的组合
lodash虽然可以处理多维, 但是迭代是同步的，前端数据来源复杂，由服务器和和用户来源组成，很多数据会因时间导致不同处理, 如多次请求, 只取最后请求的数据, rxjs用自己的迭代模式(Scheduler对象)，使得处理数据更加灵活

[slide]
[magic data-transition="kontext"]
# Observable
====
## 从已有数据源获取observable

* from {:&.moveIn}
* of
* fromEvent
* timer
====

```javascript
const observable1 = Rx.Observable.fromEvent(button, 'click')
```
====
## 自定义observable
====
```javascript
const observable2 = Rx.Observable.create((observer) => {
  observer.next(1)
  observer.next(2)
  observer.next(3)
  observer.complete()
})
```
====
subjet 继承于observable, 有next...属性，可以当成observer用
====
```javascript
const subject = Rx.Subject()
subject.next(4)
subject.complete()
```
[/magic]

[slide]
## Subscription
```javascript
subject.subscribe({
  next(value) {
    //
  }
})
observable.subscribe(
  (value) {},
  (error) {}
  () {}
)
// subject订阅observable
observable.subscribe(subject) // 这种用法subject 需要先订阅消息
observable.multicast(subject) // 这种用法返回的source直接订阅消息，最后用connect链接

observable.multicast(subject).refCount() // 这种用法返回的source直接订阅消息，当一个订阅后，直接开始。
```

[slide]
## 特殊subject

[slide]
[magic data-transition="kontext"]
### BehaviorSubject
```javascript
var subject = new Rx.BehaviorSubject(0) // 0 is the initial value

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
})

subject.next(1)
subject.next(2)

subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
})

subject.next(3)
```
====
### ReplaySubject
```javascript
var subject = new Rx.ReplaySubject(3 /* ,500 window time */);
 // buffer 3 values for new subscribers second param is window time

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
})

subject.next(1)
subject.next(2)
subject.next(3)
subject.next(4)

subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
})

subject.next(5)
```
====
### AsyncSubject
```javascript
var subject = new Rx.AsyncSubject()

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
})

subject.next(1)
subject.next(2)
subject.next(3)
subject.next(4)

subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
})

subject.next(5)
subject.complete()
```
[/magic]

[slide]
## operator
[http://rxmarbles.com](http://rxmarbles.com)
[slide]
## state store

[slide]
[magic data-transition="kontext"]
### reducer
```javascript
const countApp = (state = { count: 0 }, action) => {
  switch(action.type) {
    case 'ADD':
      return {
        ...state,
        count: state.count + 1
      }
    case 'MINUS':
      return {
        ...state,
        count: state.count - 1
      }
    case 'SET':
      return {
        ...state,
        count: action.value
      }
    default:
      return state
  }
}
```
====
```javascript
const createStore = (reduce) => {
  return {
    dispatch: (action) => {
      reduce(state, action)
    }
  }
}
const store = createStore(reduce)
const { dispatch } = store
```
[/magic]

[slide]
```javascript
const count = document.querySelector('.count')
const addObservable = Rx.Observable
  .fromEvent(document.querySelector('.add'), 'click')
  // state => state.count + 1
  .map(() => state => dispatch(state, { type: 'ADD' }))
const minusObservable = Rx.Observable
  .fromEvent(document.querySelector('.minus'), 'click')
  .map(() => state => dispatch(state, { type: 'MINUS' }))
const setObservalble = Rx.Observable
  .fromEvent(document.querySelector('.input'), 'input')
  .map(e => state => dispatch(state, { type: 'SET', value: e.target.value }))

const input = Rx.Observable.merge(addObservable, minusObservable, setObservalble)
  .scan((state, fn) => fn(state), { count: 0 })

input.subscribe((state) => {
  count.innerHTML = state.count
})
```
[slide]
# 和redux组合

[slide]
[magic data-transition="kontext"]
## redux
====
### middleware logger
```javascript
const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}
```
====
### action
```javascript
const addCount = () => ({ type: 'ADD' })
const asyncAddCount = () => (dispatch) => {
  setTimeout(() => {
    dispatch({ type: 'ASYNCADD' })
  })
}
```
====
### reduce
```javascript
const count = (count = 0, action) => {
  switch (action.type) {
    case 'ADD':
      return count + 1
    case 'ASYNCADD':
      return count + 1
    default:
      return count
  }
}

const rootReduce = Redux.combineReducers({ count })
```
====
### store
```javascript
const store = Redux.createStore(
  rootReduce,
  { count: 0 },
  Redux.applyMiddleware(ReduxThunk.default, logger)
)
store.dispatch(addCount())
store.dispatch(asyncAddCount())
```
[/magic]

[slide]
# redux-observable

[slide]
[magic data-transition="kontext"]
### middleware logger
```javascript
const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}
```
====
### action
```javascript
const addCount = () => ({ type: 'ADD' })
const asyncAddCount = () => ({ type: 'ASYNCADD' })
const cancelAdd = () => ({ type: 'CANCELADD' })
```
====
### epic
```javascript
const asyncAddCountEpic = action$ => {
  return action$.ofType('ASYNCADD')
    .delay(1000)
    .map(() => addCount())
    .takeUntil(action$.ofType('CANCELADD'))
    // race来执行cancel后的
    //.race(
    //  action$.ofType('CANCELADD')
    //    .take(1)
    //)
}
```
====
### reduce
```javascript
const count = (count = 0, action) => {
  switch (action.type) {
    case 'ADD':
      return count + 1
    case 'MINUS':
      throw Error('custom errors in minus actions')
    default:
      return count
  }
}
const loading = (loading = false, action) => {
  switch (action.type) {
    case 'ASYNCADD':
      return true
    case 'CANCELADD':
      return false
    default:
      return loading
  }
}
```
====
### store
```javascript
const rootReduce = Redux.combineReducers({ count, loading })
const rootEpic = ReduxObservable.combineEpics(asyncAddCountEpic)
const epicMiddleware = ReduxObservable.createEpicMiddleware(rootEpic)
const store = Redux.createStore(
  rootReduce,
  { count: 0, loading: false },
  Redux.applyMiddleware(epicMiddleware, logger)
)
store.dispatch(addCount())
store.dispatch(asyncAddCount())
setTimeout(() => store.dispatch(cancelAdd()), 500)
```
[/magic]

[slide]
# 谢谢
