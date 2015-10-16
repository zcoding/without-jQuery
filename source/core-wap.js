// 只兼容大部分移动端浏览器
window.J = (function() {

  function Fuck(ele) {
    this.ele = ele;
  }

  var wrapper = function(ele) {
    return new Fuck(ele);
  };

  wrapper.support = {};

  wrapper.extend = function(key, value) {
    Fuck.prototype[key] = value;
  };

  return wrapper;

})();
