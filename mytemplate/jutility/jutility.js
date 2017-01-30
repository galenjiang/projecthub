/**
 * Created by galenjiang on 2015/9/4.
 */
var $j = {};

//简单模块框架
(function () {
  var moduleMap = {};
  var fileMap = {};

  var noop = function () {
  };

  var $j = {
    define: function(name, dependencies, factory) {
      if (!moduleMap[name]) {
        var module = {
          name: name,
          dependencies: dependencies,
          factory: factory
        };

        moduleMap[name] = module;
      }

      return moduleMap[name];
    },

    use: function(name) {
      var module = moduleMap[name];

      if (!module.entity) {
        var args = [];
        for (var i=0; i<module.dependencies.length; i++) {
          if (moduleMap[module.dependencies[i]].entity) {
            args.push(moduleMap[module.dependencies[i]].entity);
          }
          else {
            args.push(this.use(module.dependencies[i]));
          }
        }

        module.entity = module.factory.apply(noop, args);
      }

      return module.entity;
    },

    require: function (pathArr, callback) {
      for (var i = 0; i < pathArr.length; i++) {
        var path = pathArr[i];

        if (!fileMap[path]) {
          var head = document.getElementsByTagName('head')[0];
          var node = document.createElement('script');
          node.type = 'text/javascript';
          node.async = 'true';
          node.src = path + '.js';
          node.onload = function () {
            fileMap[path] = true;
            head.removeChild(node);
            checkAllFiles();
          };
          head.appendChild(node);
        }
      }

      function checkAllFiles() {
        var allLoaded = true;
        for (var i = 0; i < pathArr.length; i++) {
          if (!fileMap[pathArr[i]]) {
            allLoaded = false;
            break;
          }
        }

        if (allLoaded) {
          callback();
        }
      }
    }
  };

  window.$j = $j;
})();

/*
 * Interface Class
 * 接口类需要2个参数
 * 参数1: 接口的名字(string)
 * 参数2: 接受方法名称的集合(数组) (array)
 * */
$j.Interface = function (name, methods) {
  //判断接口的参数个数
  if (arguments.length != 2) {
    throw new Error("this instance interface constructor arguments must has 2 pieces");
  }
  this.name = name;
  this.methods = [];
  for (var i = 0, len = methods.length; i < len; i++) {
    if (typeof methods[i] !== "string") {
      throw new Error("the interface method name is error!");
    }
    this.methods.push(methods[i]);
  }
};

/*
* 三： 检验接口里的方法
*如果检验通过 不做任何操作 不通过；浏览器抛出error
*这个方法的目的 就是检测方法的
* */
$j.Interface.ensureImplements = function (object) {
  //如果检测方法接受的参数小于2个 参数传递失败！
  if (arguments.length < 2) {
    throw new Error("interface.ensureImplements method constructor arguments must >=2 !")
  }
  //获得接口实例对象
  for (var i = 1, len = arguments; i < len; i++) {
    var instanceInterface = arguments[i];
    //判断参数是否是接口类的类型
    if (instanceInterface.constructor !== j.Interface) {
      throw new Error("the arguments constructor not be interface class");
    }
    //循环接口实例对象里面的每一个方法
    for (var j = 0; j < instanceInterface.methods.length; j++) {
      //用一个临时变量 接受每一个方法的名字(注意是字符串)
      var methodName = instanceInterface.methods[j];
      //object[key]就是方法
      if (!object[methodName] || typeof object[methodName] !== "function") {
        throw new Error("the method name" + methodName + "is not found!");
      }
    }
  }
};

//继承
$j.extend = function extent(sub, sup) {
  //目的: 实现只继承父类的原形对象
  var F = new Function();
  F.prototype = sup.prototype;
  sub.prototype = new F();
  sub.prototype.constructor = sub;
  sub.superClass = sup.prototype;
  if (sup.prototype.constructor == Object.prototype.constructor) {
    sup.prototype.constructor = sup;
  }
};

//遍历数组，返回re:{bTrue:false,index:-1}
$j.findInArr = function (arr, string) {
  var re = {
    bTrue: false,
    index: -1
  };
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == string) {
      re.bTrue = true;
      re.index = i;
      return re;
    }
  }
  return re;
};

//读取UA判断是否微信接口
$j.isWeiXin = function () {
  var _ua = window.navigator.userAgent.toLowerCase();
  return (_ua.match(/MicroMessenger/i) == 'micromessenger')
};




