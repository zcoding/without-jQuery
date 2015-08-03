var sizeUtils = (function() {

  function getWidth(element) {}

  function getHeight(element) {}

  function setWidth(element, value) {}

  function setHeight(element, value) {}

  function width(element, value) {
    if (typeof value === 'undefined') {
      return getWidth(element);
    } else {
      setWidth(element, value);
    }
  }

  function height(element, value) {
    if (typeof value === 'undefined') {
      return getHeight(element);
    } else {
      setHeight(element, value);
    }
  }

  function outerWidth(element, withMargin) {} // offsetWidth

  function innerWidth() {} // clientWidth

  return {
    width: width,
    height: height,
    outerWidth: outerWidth,
    innerWidth: innerWidth
  };

})();
