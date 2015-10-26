(function(handler) {

  handler.extend('append', function() {});

  handler.extend('prepend', function() {});

  handler.extend('before', function() {});

  handler.extend('after', function() {});

  handler.extend('parent', function() {});

  handler.extend('html', function(value) {
    if (value) {
      this.ele.innerHTML = value;
      return this;
    } else {
      return this.ele.innerHTML;
    }
  });

  handler.extend('remove', function(selector) {

  });

  handler.extend('empty', function() {
    this.ele.innerHTML = '';
    return this;
  });

})(J);
