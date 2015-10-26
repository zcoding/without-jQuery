(function(handler) {

  handler.extend('show', function() {
    // this.ele.style.display = '';
    return this;
  });

  handler.extend('hide', function() {
    this.ele.style.display = 'none';
    return this;
  });

  handler.extend('toggle', function() {});

  handler.extend('fadeIn', function() {});

  handler.extend('fadeOut', function() {});

  handler.extend('fadeToggle', function() {});

  handler.extend('slideUp', function() {});

  handler.extend('slideDown', function() {});

  handler.extend('slideToggle', function() {});

})(J);
