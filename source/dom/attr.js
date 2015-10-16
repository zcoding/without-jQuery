(function(handler) {

  handler.extend('attr', function(attr, value) {
    if (value) {
      this.ele.setAttribute(attr, value);
      return this;
    } else {
      return this.ele.getAttribute(attr);
    }
  });

  handler.extend('hasAttr', function(attr) {
    return this.ele.hasAttribute(attr);
  });

  handler.extend('removeAttr', function(attr) {
    this.ele.removeAttribute(attr);
    return this;
  });

})(J);
