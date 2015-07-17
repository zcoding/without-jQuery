var cssUtils = {
  css: function(element, prop, value) {
    if (typeof value === 'undefined') {
      return getStyles(element).getPropertyValue(prop);
    } else {
      var c = {};
      c[prop] = value;
      setStyles(element, c);
    }
  }
};
