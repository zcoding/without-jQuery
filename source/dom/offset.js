(function(handler) {

  // getBoundingClientRect

  handler.extend('offsetTop', function(value) {
    if (value) {
      this.ele.offsetTop = value;
      return this;
    } else {
      return this.ele.offsetTop;
    }
  });

  handler.extend('offsetLeft', function(value) {
    if (value) {
      this.ele.offsetLeft = value;
      return this;
    } else {
      return this.ele.offsetLeft;
    }
  });

  handler.extend('offset', function(left, top) {
    if (left && top) {
      this.ele.offsetLeft = left;
      this.ele.offsetTop = top;
      return this;
    } else {
      left = this.ele.offsetLeft;
      top = this.ele.offsetTop;
      return {
        left: left,
        top: top
      };
    }
  });

})(J);
