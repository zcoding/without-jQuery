var classHelper = (function() {

  var modern = !!document.body['classList'];

  function addClass(element, className) {
    if (modern) {
      element.classList.add(className);
    } else {
      element.className += ' ' + className;
    }
  }

  function removeClass(element, className) {
    if (modern) {
      element.classList.remove(className);
    } else {
      element.className = element.className.replace(/(?:^|\s)MyClass(?!\S)/g, '');
    }
  }

  function toggleClass(element, className) {
    if (modern) {
      element.classList.toggle(className);
    } else {
      if (hasClass(element, className)) {
        removeClass(element, className);
      } else {
        addClass(element, className);
      }
    }
  }

  function hasClass(element, className) {
    if (modern) {
      return element.classList.contains(className);
    } else {
      var matcher = new RegExp('(?:^|\\s)' + className + '(?!\\S)');
      return element.className.match(matcher) !== null;
    }
  }

  return {
    add: addClass,
    remove: removeClass,
    toggle: toggleClass,
    has: hasClass
  }

})();
