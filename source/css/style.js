// 首先要获取当前style

// IE8
var CSSSD = (function() {

  var Push = Array.prototype.push;

  function getComputedStylePixel(element, property, fontSize) {
      var
      value = element.currentStyle[property].match(/([\d\.]+)(%|cm|em|in|mm|pc|pt|)/) || [0, 0, ''],
      size = value[1],
      suffix = value[2],
      rootSize;

      fontSize = fontSize != null ? fontSize : /%|em/.test(suffix) && element.parentElement ? getComputedStylePixel(element.parentElement, 'fontSize', null) : 16;
      rootSize = property == 'fontSize' ? fontSize : /width/i.test(property) ? element.clientWidth : element.clientHeight;

      return suffix == '%' ? size / 100 * rootSize :
             suffix == 'cm' ? size * 0.3937 * 96 :
             suffix == 'em' ? size * fontSize :
             suffix == 'in' ? size * 96 :
             suffix == 'mm' ? size * 0.3937 * 96 / 10 :
             suffix == 'pc' ? size * 12 * 96 / 72 :
             suffix == 'pt' ? size * 96 / 72 :
             size;
  }

  function setShortStyleProperty(style, property) {
      var
      borderSuffix = property == 'border' ? 'Width' : '',
      t = property + 'Top' + borderSuffix,
      r = property + 'Right' + borderSuffix,
      b = property + 'Bottom' + borderSuffix,
      l = property + 'Left' + borderSuffix;

      style[property] = (style[t] == style[r] && style[t] == style[b] && style[t] == style[l] ? [ style[t] ] :
                         style[t] == style[b] && style[l] == style[r] ? [ style[t], style[r] ] :
                         style[l] == style[r] ? [ style[t], style[r], style[b] ] :
                         [ style[t], style[r], style[b], style[l] ]).join(' ');
  }

  function CSSSD(element) {
      var
      style = this,
      currentStyle = element.currentStyle,
      fontSize = getComputedStylePixel(element, 'fontSize');

      for (property in currentStyle) {
          Push.call(style, property === 'styleFloat' ? 'float' : property.replace(/[A-Z]/, function (match) {
              return '-' + match.toLowerCase();
          }));

          switch (property) {
            case 'width':
              style[property] = element.offsetWidth + 'px';
              break;
            case 'height':
              style[property] = element.offsetHeight + 'px';
              break;
            case 'styleFloat':
              style['float'] = currentStyle[property];
              break;
            default:
              if (/margin.|padding.|border.+W/.test(property) && style[property] !== 'auto') {
                style[property] = Math.round(getComputedStylePixel(element, property, fontSize)) + 'px';
              } else {
                style[property] = currentStyle[property];
              }
          }

      }

      setShortStyleProperty(style, 'margin');
      setShortStyleProperty(style, 'padding');
      setShortStyleProperty(style, 'border');

      style.fontSize = Math.round(fontSize) + 'px';
  }

  CSSSD.prototype = {
      constructor: CSSSD,
      getPropertyValue: function (property) {
          return this[property.replace(/-\w/g, function (match) {
              return match[1].toUpperCase();
          })];
      },
      item: function (index) {
          return this[index];
      }
  };

  return CSSSD;

})();

function getStyles(element) {
  if ("getComputedStyle" in element.ownerDocument.defaultView) {
    return element.ownerDocument.defaultView.getComputedStyle(element, null);
  } else { // 兼容IE8及以下版本
    return new CSSSD(element);
  }
}

// set styles 用的是inline style，没有兼容性问题
function setStyles(element, styles) {
  for (var s in styles) {
    if (styles.hasOwnProperty(s)) {
      element.style[s] = styles[s];
    }
  }
}
