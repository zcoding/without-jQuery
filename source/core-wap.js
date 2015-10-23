window.J = (function() {

  function JDOM(selector) {
    if (selector instanceof HTMLElement) {
      this.ele = selector;
    } else {
      this.ele = document.querySelectorAll(selector);
    }
    this.event_callbacks = {}; // 事件回调列表
  }

  var wrapper = function(selector) {
    return new JDOM(selector);
  };

  wrapper.support = {};

  wrapper.fuck = {
    ie: true
  };

  var uaString = navigator.userAgent;

  var isMobile = /mobile|tablet|ip(ad|hone|od)|android/i.test(uaString);

  var matchDevice = uaString.match(/iPhone|iPad|Android|Lumia|Nokia|BB(\d+)?|PlayBook/i);
  var device = matchDevice ? matchDevice[0]: 'Others';
  device = device.replace(/BB(\d+)?|PlayBook/i, 'BlackBerry');

  var is_ios = /iPhone|iPad/i.test(device);
  var os = is_ios ? 'ios' : 'Others';

  wrapper.env = {
    device: device,
    os: os,
    browser: ''
  };

  wrapper.extend = function(key, value) {
    JDOM.prototype[key] = value;
  };

  return wrapper;

})();
