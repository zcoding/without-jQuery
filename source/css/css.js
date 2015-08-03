var cssUtils = {
  css: function(element, prop, value) {
    if (typeof value === 'undefined') {
      return getStyles(element).getPropertyValue(prop);
    } else {
      var c = {};
      c[prop] = value;
      setStyles(element, c);
    }
  }
};

// function addCSSRule(sheet, selector, rules, index) {
// 	if(sheet.insertRule) {
// 		sheet.insertRule(selector + "{" + rules + "}", index);
// 	}
// 	else {
// 		sheet.addRule(selector, rules, index);
// 	}
// }
// // Use it!
// addCSSRule(document.styleSheets[0], "header", "float: left");
