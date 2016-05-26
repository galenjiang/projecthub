title: 分享
speaker: galen





[slide]

## javascript中的this

##

### 先来看个例子  

```javascript
var name = "Bob";
var nameObj ={
    name : "Tom",
    showName : function(){
        alert(this.name);
    },
    waitShowName : function(){
        setTimeout(this.showName, 1000);
        setTimeout(function(){
            nameObj.showName()
        }, 1000);
  }
};
nameObj.waitShowName();
```

[slide]

一般而言，在Javascript中，this指向函数**执行时**的当前对象

> The this keyword is relative to the execution context, not the declaration context.


[slide]
* 当没有明确的执行时的当前对象时，this指向全局对象window。
```javascript
            var obj = {
                 bar: "bar",
                 foo: function(){
                     console.log(this);
                 }
             };
             obj.foo();
             var bar = obj.foo;
             bar()
```


[slide]

* 在浏览器中setTimeout、setInterval和匿名函数执行时的当前对象通常是是全局对象window，当然也有例外

```javascript


    foo(function (){
        console.log(this)
    });


    function foo(fn){
            fn.call({});
        }

    //el.addEventListener('click', bar, false);
```


[slide]

* eval函数 指向当前执行环境  

```javascript
var name = "window";

var Bob = {
    name: "Bob",
    showName: function(){
        eval("alert(this.name)");
    }
};

Bob.showName();    //Bob
```

[slide]

当然还有很多很多例子，
涉及 new     还有es5中的 call,apply,bind,  以及es6中的() => {}

lambda表达式：  

> 要计算x的平方加2  

```
(λx.x*x)(λx.x+2)
```   

假如用js来写

```
(function(x){ retrun x + 2; })((function(x){ return x*x })(N))
```

es6可以写成  
```
(x => x + 2)((x => x * x)(N))
```
不一一列举了。
