// WARNING:这个模块只用在PC端，对于只兼容移动端的项目不需要引入
(function(handler) {

  var toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ? ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'];

  var customMouseWheel = J.event('custommousewheel');

  function handleMouseWheel(event) {
    event.target.dispatchEvent(customMouseWheel);
  }

  if (handler.support.addEventListener) {
    for (var i = toBind.length; i; ) {
      document.addEventListener(toBind[--i], handleMouseWheel, false);
    }
  } else {
    document.onmousewheel = handleMouseWheel;
  }

})(J);
