// 兼容性：http://caniuse.com/#search=classlist
(function(handler) {

  var support = handler.support.classList = !!document.body['classList'];

  if (support) {
    handler.addClass = function(element, classes) {
      classes = classes.split(/\s+/);
      classes.forEach(function(klass) {
        element.classList.add(klass);
      });
      return element;
    };

    handler.removeClass = function(element, classes) {
      classes = classes.split(/\s+/);
      classes.forEach(function(klass) {
        element.classList.remove(klass);
      });
      return element;
    };

    handler.hasClass = function(element, classes) {
      classes = classes.split(/\s+/);
      var result = true;
      for (var i = 0; i < classes.length; ++i)  {
        if (!element.classList.contains(classes[i])) {
          result = false;
          break;
        }
      }
      return result;
    };

    handler.toggleClass = function(element, classes) {
      classes = classes.split(/\s+/);
      classes.forEach(function(klass) {
        element.classList.toggle(klass);
      });
      return element;
    };

  } else {

    handler.addClass = function(element, classes) {
      element.className += ' ' + classes;
      return element;
    };

    handler.removeClass = function(element, classes) {
      classes = classes.split(/\s+/);
      for (var i = 0; i < classes.length; ++i) {
        var matcher = new RegExp('(?:^|\\s)' + classes[i] + '(?!\\S)', 'g');
        element.className = element.className.replace(matcher, '');
      }
      return element;
    };

    handler.hasClass = function(element, classes) {
      classes = classes.split(/\s+/);
      var result = true;
      for (var i = 0; i < classes.length; ++i) {
        var matcher = new RegExp('(?:^|\\s)' + classes[i] + '(?!\\S)', 'g');
        if (element.className.match(matcher) === null) {
          result = false;
          break;
        }
      }
      return result;
    };

    handler.toggleClass = function(element, classes) {
      classes = classes.split(/\s+/);
      for (var i = 0; i < classes.length; ++i) {
        if (handler.hasClass(element, classes[i])) {
          handler.removeClass(element, classes[i]);
        } else {
          handler.addClass(element, classes[i]);
        }
      }
      return element;
    }
  }

  handler.extend('addClass', function(classes) {
    handler.addClass(this.ele, classes);
    return this;
  });

  handler.extend('removeClass', function(classes) {
    handler.removeClass(this.ele, classes);
    return this;
  });

  handler.extend('hasClass', function(classes) {
    return handler.hasClass(this.ele, classes);
  });

  handler.extend('toggleClass', function(classes) {
    handler.toggleClass(this.ele, classes);
    return this;
  });

})(J);
