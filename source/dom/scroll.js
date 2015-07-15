/**
 * 兼容性：IE8/IE8+
 */
var scrollUtils = (function() {

  function getScrollTop() {
    return window['pageYOffset'] || document.documentElement['scrollTop'];
  }

  function getScrollLeft() {
    return window['pageXOffset'] || document.documentElement['scrollLeft'];
  }

  function setScrollTop(value) {
    window.scrollTo(getScrollLeft(), value);
  }

  function setScrollLeft(value) {
    window.scrollTo(value, getScrollTop());
  }

  function getElementScrollTop(element) {
    return element.scrollTop;
  }

  function getElementScrollLeft(element) {
    return element.scrollLeft;
  }

  function setElementScrollTop(element, value) {
    element.scrollTop = value;
  }

  function setElementScrollLeft(element, value) {
    element.scrollLeft = value;
  }

  function scrollTop(element, value) {
    if (value === undefined) {
      return element === window ? getScrollTop() : getElementScrollTop(element);
    } else {
      return element === window ? setScrollTop(value) : setElementScrollTop(element, value);
    }
  }

  function scrollLeft(element, value) {
    if (value === undefined) {
      return element === window ? getScrollLeft() : getElementScrollLeft(element);
    } else {
      return element === window ?  setScrollLeft(value) : setElementScrollLeft(element, value);
    }
  }

  function scrollTo(element, left, top) {
    if (element === window) {
      window.scrollTo(left, top);
    } else {
      setElementScrollLeft(element, left);
      setElementScrollTop(element, top);
    }
  }

  return {
    scrollTop: scrollTop,
    scrollLeft: scrollLeft,
    scrollTo: scrollTo
  }

})();
