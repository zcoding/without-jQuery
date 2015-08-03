var attrUtils = {
  attr: function(element, attr, value) {
    if (typeof value === 'undefined') {
      return element.getAttribute(attr);
    } else {
      element.setAttribute(attr, value);
    }
  },
  hasAttr: function(element, attr) {
    return element.hasAttribute(attr);
  },
  removeAttr: function(element, attr) {
    element.removeAttribute(attr);
  }
};
