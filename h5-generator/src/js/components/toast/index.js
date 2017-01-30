var Toast = Vue.extend(require('./toast'));
var toastPool = [];

var getAnInstance = function() {
  if (toastPool.length > 0) {
    var instance = toastPool[0];
    toastPool.splice(0, 1);
    return instance;
  }
  return new Toast({
    el: document.createElement('div')
  });
};

var returnAnInstance = function(instance) {
  if (instance) {
    toastPool.push(instance);
  }
};

module.exports = function(options) {
  options = options || {};

  var message, position, duration, className, iconClass;

  if (typeof options === 'string') {
    message = options;
    duration = 3000;
    position = 'middle';
    className = '';
    iconClass = '';
  } else {
    message = options.message;
    duration = options.duration || 3000;
    position = options.position || 'middle';
    className = options.className || '';
    iconClass = options.iconClass || '';
  }

  var instance = getAnInstance();

  instance.message = message;
  instance.position = position;
  instance.className = className;
  instance.iconClass = iconClass;

  Vue.nextTick(function() {
    instance.$appendTo(document.body);
    setTimeout(function() {
      instance.$remove();
      returnAnInstance(instance);
    }, duration);
  });
};
