// IE6/7/8
var ready2 = (function() {

  var isReady = false;

  var callbacks = [];

  document.onreadystatechange = function () {
    if (document.readyState == "interactive") {
      while (callbacks.length > 0) {
        var cb = callbacks.splice(i, 1);
        if (typeof cb === 'function') {
          cb.call(null);
        }
      }
    }
  }

  return function(cb) {
    if (isReady) {
      if (typeof cb === 'function') {
        cb.call(null);
      }
    } else {
      callbacks.push(cb);
    }
  };

})(J);
