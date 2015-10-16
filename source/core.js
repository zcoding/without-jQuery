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

// 核心功能
// 1. 拓展的选择器
// 2. 类工具
// 3. 属性工具
// 4. 事件系统
// 5. 样式工具
// 6. AJA和fetch
// 7. form工具
// 8. 其它工具
// 9. 动画系统
// 10. Promise

// 拓展功能
// 1. cookie工具
// 2. 验证工具
// 3. MVVM
// 4. 缓存系统
// 5. 本地缓存和web数据库工具
