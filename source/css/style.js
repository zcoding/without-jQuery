(function(handler) {

  var support = handler.support.getComputedStyle = !!(document.defaultView && document.defaultView["getComputedStyle"]);

  var getStyles = function(element) {
    var view = element.ownerDocument.defaultView;
    if (!view.opener) {
      view = window;
    }
    return view.getComputedStyle(element);
  };

  function setStyles (element, styles) {
    for (var s in styles) {
      if (styles.hasOwnProperty(s)) {
        element.style[s] = styles[s];
      }
    }
  }

  handler.extend('css', function(name, value) {
    if (handler.is('plainObject', name)) {
      setStyles(this.ele, name);
      return this;
    } else if (value) {
      this.ele.style[name] = value;
      return this;
    } else {
      var computed = getStyles(this.ele);
      return computed.getPropertyValue(name) || computed[name];
    }
  });

})(J);
