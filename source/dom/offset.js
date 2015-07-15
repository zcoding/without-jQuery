var offsetUtils = (function() {

  // getBoundingClientRect

  function offsetTop(element, value) {
    if (typeof value === 'undefined') {
      return element.offsetTop;
    } else {
      element.offsetTop = value;
    }
  };

  function offsetLeft(element, value) {
    if (typeof value === 'undefined') {
      return element.offsetLeft;
    } else {
      element.offsetLeft = value;
    }
  }

  function offset(element, left, top) {
    if (typeof value === 'undefined') {
      return {left: element.offsetLeft, top: element.offsetTop};
    } else {
      element.offsetLeft = left;
      element.offsetTop = top;
    }
  }

  return {
    offsetTop: offsetTop,
    offsetLeft: offsetLeft,
    offset: offset
  };

})();
