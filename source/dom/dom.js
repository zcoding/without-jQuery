function $(element) {
  return {
    "attr": function(attribute, value) {
      if (value) {
        element.setAttribute(attribute, value);
        return this;
      } else {
        return element.getAttribute(attribute);
      }
    },
    "style": function(style, value) {
      if (value) {
        element.style[style] = value;
        return this;
      } else {
        return element.style[style];
      }
    },
    "css": function(css, value) {
      if (value) {
        return this.style(css, value);
      } else {
        return window.getComputedStyle(element).getPropertyValue(css);
      }
    }
  };
};

function getStyle(el, styleProp) {
  var value, defaultView = (el.ownerDocument || document).defaultView;
  // W3C standard way:
  if (defaultView && defaultView.getComputedStyle) {
    // sanitize property name to css notation
    // (hypen separated words eg. font-Size)
    styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
    return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
  } else if (el.currentStyle) { // IE
    // sanitize property name to camelCase
    styleProp = styleProp.replace(/\-(\w)/g, function(str, letter) {
      return letter.toUpperCase();
    });
    value = el.currentStyle[styleProp];
    // convert other units to pixels on IE
    if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
      return (function(value) {
        var oldLeft = el.style.left, oldRsLeft = el.runtimeStyle.left;
        el.runtimeStyle.left = el.currentStyle.left;
        el.style.left = value || 0;
        value = el.style.pixelLeft + "px";
        el.style.left = oldLeft;
        el.runtimeStyle.left = oldRsLeft;
        return value;
      })(value);
    }
    return value;
  }
}

function addCSSRule(sheet, selector, rules, index) {
	if(sheet.insertRule) {
		sheet.insertRule(selector + "{" + rules + "}", index);
	}
	else {
		sheet.addRule(selector, rules, index);
	}
}
// Use it!
addCSSRule(document.styleSheets[0], "header", "float: left");
