(function(handler) {

  var support = handler.support.classList = !!document.createElement('div')['classList'];

  var addClass, removeClass, hasClass, toggleClass;

  var classSplitReg = /\s+/;

  if (support) {
    addClass = function(element, classes) {
      classes = classes.split(classSplitReg);
      var classList = element.classList;
      classes.forEach(function(klass) {
        classList.add(klass);
      });
      return element;
    };

    removeClass = function(element, classes) {
      classes = classes.split(classSplitReg);
      var classList = element.classList;
      classes.forEach(function(klass) {
        classList.remove(klass);
      });
      return element;
    };

    hasClass = function(element, classes) {
      if (element.nodeType !== 1) {
        return false;
      }
      classes = classes.split(classSplitReg);
      var result = true;
      var classList = element.classList;
      for (var i = 0; i < classes.length; ++i)  {
        if (!classList.contains(classes[i])) {
          result = false;
          break;
        }
      }
      return result;
    };

    toggleClass = function(element, classes) {
      classes = classes.split(classSplitReg);
      var classList = element.classList;
      classes.forEach(function(klass) {
        classList.toggle(klass);
      });
      return element;
    };

  } else {

    addClass = function(element, classes) {
      element.className += ' ' + classes;
      return element;
    };

    removeClass = function(element, classes) {
      classes = classes.split(classSplitReg);
      for (var i = 0; i < classes.length; ++i) {
        var matcher = new RegExp('(?:^|\\s)' + classes[i] + '(?!\\S)', 'g');
        element.className = element.className.replace(matcher, '');
      }
      return element;
    };

    hasClass = function(element, classes) {
      if (element.nodeType !== 1) {
        return false;
      }
      classes = classes.split(classSplitReg);
      var result = true;
      for (var i = 0; i < classes.length; ++i) {
        if (element.className.indexOf(classes[i]) === -1) {
          result = false;
          break;
        }
      }
      return result;
    };

    toggleClass = function(element, classes) {
      classes = classes.split(classSplitReg);
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
    addClass(this.ele, classes);
    return this;
  });

  handler.extend('removeClass', function(classes) {
    removeClass(this.ele, classes);
    return this;
  });

  handler.extend('hasClass', function(classes) {
    return hasClass(this.ele, classes);
  });

  handler.extend('toggleClass', function(classes) {
    toggleClass(this.ele, classes);
    return this;
  });

})(J);
