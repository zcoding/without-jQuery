(function(handler) {

  handler.extend('width', function(_width) {
    if (_width) {
      this.ele.style.width = _width;
      return this;
    } else {
      return this.ele.offsetWidth;
    }
  });

  handler.extend('height', function(_height) {
    if (_height) {
      this.ele.style.height = _height;
      return this;
    } else {
      return this.ele.offsetHeight;
    }
  });

  handler.extend('innerWidth', function() {
    return this.ele.clientWidth;
  });

  handler.extend('innerHeight', function() {
    return this.ele.clientHeight;
  });

})(J);
