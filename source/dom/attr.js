(function(handler) {

  handler.extend('attr', function(name, value) {
    if (value) {
      this.ele.setAttribute(name, value);
      return this;
    } else {
      return this.ele.getAttribute(name);
    }
  });

  handler.extend('hasAttr', function(name) {
    return this.ele.hasAttribute(name);
  });

  handler.extend('removeAttr', function(name) {
    this.ele.removeAttribute(name);
    return this;
  });

})(J);
