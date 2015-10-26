(function(handler) {

  var support = handler.support.getComputedStyle = !!(document.defaultView && document.defaultView["getComputedStyle"]);

  var getStyles;

  if (!support && !handler.fuck.ie) {
    getStyles = function(element) {
      return new CSSSD(element);
    };
  } else {
    getStyles = function(element) {
      return element.ownerDocument.defaultView.getComputedStyle(element, null);
    };
  }

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
      return getStyles(this.ele)[name];
    }
  });

})(J);
