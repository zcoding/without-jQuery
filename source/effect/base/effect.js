// 首先要获取style
function getStyle(element, prop) {
  if ("getComputedStyle" in window) {
    return window.getComputedStyle(element, null).getPropertyValue(prop);
  } else {
    return element.currentStyle(prop);
  }
}

var effectUtils = {

  show: function(element) {},

  hide: function(element) {},

  toggle: function(element) {},

  fadeIn: function(element) {},

  fadeOut: function(element) {},

  fadeToggle: function(element) {},

  slideDown: function(element) {},

  slideUp: function(element) {},

  slideToggle: function(element) {}

};
