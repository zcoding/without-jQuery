(function(handler) {

  handler.scrollTop = function(value) {
    if (value) {
      window.scrollTo(handler.scrollLeft(), value);
      return handler;
    } else {
      return window['pageYOffset'] || document.documentElement['scrollTop'];
    }
  };

  handler.scrollLeft = function(value) {
    if (value) {
      window.scrollTo(value, handler.scrollTop());
      return handler;
    } else {
      return window['pageXOffset'] || document.documentElement['scrollLeft'];
    }
  };

  handler.scrollTo = function(left, top) {
    window.scrollTo(left, top);
  };

  handler.extend('scrollLeft', function(value) {
    if (value) {
      this.ele.scrollLeft = value;
      return this;
    } else {
      return this.ele.scrollLeft;
    }
  });

  handler.extend('scrollTop', function(value) {
    if (value) {
      this.ele.scrollTop = value;
      return this;
    } else {
      return this.ele.scrollTop;
    }
  });

  handler.extend('scrollTo', function(left, top) {
    return this.scrollLeft(left).scrollTop(top);
  });

})(J);
