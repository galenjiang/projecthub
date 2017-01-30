/**
 * Created by galenjiang on 2015/9/4.
 */
var $j = {};

//��ģ����
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
 * �ӿ�����Ҫ2������
 * ����1: �ӿڵ�����(string)
 * ����2: ���ܷ������Ƶļ���(����) (array)
 * */
$j.Interface = function (name, methods) {
  //�жϽӿڵĲ�������
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
* ���� ����ӿ���ķ���
*�������ͨ�� �����κβ��� ��ͨ����������׳�error
*���������Ŀ�� ���Ǽ�ⷽ����
* */
$j.Interface.ensureImplements = function (object) {
  //�����ⷽ�����ܵĲ���С��2�� ��������ʧ�ܣ�
  if (arguments.length < 2) {
    throw new Error("interface.ensureImplements method constructor arguments must >=2 !")
  }
  //��ýӿ�ʵ������
  for (var i = 1, len = arguments; i < len; i++) {
    var instanceInterface = arguments[i];
    //�жϲ����Ƿ��ǽӿ��������
    if (instanceInterface.constructor !== j.Interface) {
      throw new Error("the arguments constructor not be interface class");
    }
    //ѭ���ӿ�ʵ�����������ÿһ������
    for (var j = 0; j < instanceInterface.methods.length; j++) {
      //��һ����ʱ���� ����ÿһ������������(ע�����ַ���)
      var methodName = instanceInterface.methods[j];
      //object[key]���Ƿ���
      if (!object[methodName] || typeof object[methodName] !== "function") {
        throw new Error("the method name" + methodName + "is not found!");
      }
    }
  }
};

//�̳�
$j.extend = function extent(sub, sup) {
  //Ŀ��: ʵ��ֻ�̳и����ԭ�ζ���
  var F = new Function();
  F.prototype = sup.prototype;
  sub.prototype = new F();
  sub.prototype.constructor = sub;
  sub.superClass = sup.prototype;
  if (sup.prototype.constructor == Object.prototype.constructor) {
    sup.prototype.constructor = sup;
  }
};

//�������飬����re:{bTrue:false,index:-1}
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

//��ȡUA�ж��Ƿ�΢�Žӿ�
$j.isWeiXin = function () {
  var _ua = window.navigator.userAgent.toLowerCase();
  return (_ua.match(/MicroMessenger/i) == 'micromessenger')
};




