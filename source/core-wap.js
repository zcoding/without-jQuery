// 只兼容绝大部分移动端浏览器
window.J = (function() {

  function Fuck(ele) {
    this.ele = ele; // DOM元素
    this.event_callbacks = {}; // 事件回调列表
  }

  var wrapper = function(ele) {
    return new Fuck(ele);
  };

  wrapper.support = {};

  wrapper.fuck = {
    ie: true
  };

  var uaString = navigator.userAgent;

  var isMobile = /mobile|tablet|ip(ad|hone|od)|android/i.test(navigator.userAgent);

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
    Fuck.prototype[key] = value;
  };

  return wrapper;

})();
