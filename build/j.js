window.J = (function() {

  function Fuck(ele) {
    this.ele = ele;
  }

  var wrapper = function(ele) {
    return new Fuck(ele);
  };

  wrapper.support = {};

  wrapper.extend = function(key, value) {
    Fuck.prototype[key] = value;
  };

  return wrapper;

})();

// 核心功能
// 1. 拓展的选择器
// 2. 类工具
// 3. 属性工具
// 4. 事件系统
// 5. 样式工具
// 6. AJA
// 7. form工具
// 8. 其它工具
// 9. 动画系统
// 10. Promise

// 拓展功能
// 1. cookie工具
// 2. 验证工具
// 3. MVVM
// 4. 缓存系统

(function(handler) {

  "use strict";

  var supportIsArray = handler.support.isArray = !!Array['isArray'];

  var win = window
  , decodeC = win.decodeURIComponent
  , encodeC = win.encodeURIComponent
  , oprtt = Object.prototype
  , hasOwn = oprtt.hasOwnProperty
  , isArray = supportIsArray ? Array.isArray : function(obj) {
    return oprtt.toString.call(obj) === '[object Array]';
  }
  , isFunction = function(obj) {
    return oprtt.toString.call(obj) === '[object Function]';
  };

  var typeCheck = {
    "array": isArray,
    "function": isFunction
  };

  /**
   * type check
   * @param {String} type
   * @param {Object} obj
   *
   * .is('Array')
   * .is('Function')
   * .is('Number')
   * .is('Integer')
   * .is('String')
   * .is('url')
   * .is('email')
   * .is('NaN')
   * .is('PlainObject')
   * .is('IE')
   * .is('chrome')
   * .is('firefox')
   * .is('safari')
   * .is('iOS')
   * .is('Android')
   * .is('WP')
   */
  handler.is = function(type, obj) {
    return typeCheck[type.toLowerCase()](obj);
  };



  // utils.parseJSON => JSON.parse

  handler.extend = function() {};

  handler.each = function() {};

  handler.map = function() {};

  /**
   * 数组去重
   * @param {Array} list
   * @param {Function} compare
   * @return {Array} original list handler
   */
  handler.unique = function(list, compare) {
    compare = compare || function (a, b) {
      return a === b;
    };
    for(var i = 0;  i < list.length; ++i) {
        for(var j = i + 1; j < list.length; ++j) {
            if(compare(list[i], list[j])) {
                list.splice(j, 1);
                j--;
            }
        }
    }
    return list;
  };

})(J);

(function(handler) {

  document.removeEventListener('DOMContentLoaded');

  handler.ready = new iPromise(function(_resolve, _reject) {
    document.addEventListener('DOMContentLoaded', function() {
      _resolve('loaded');
    });
  });

})(J);

(function(handler) {

  handler.extend('attr', function(attr, value) {
    if (value) {
      this.ele.setAttribute(attr, value);
      return this;
    } else {
      return this.ele.getAttribute(attr);
    }
  });

  handler.extend('hasAttr', function(attr) {
    return this.ele.hasAttribute(attr);
  });

  handler.extend('removeAttr', function(attr) {
    this.ele.removeAttribute(attr);
    return this;
  });

})(J);

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

(function(handler) {

  handler.extend('width', function(_width) {
    if (_width) {
      this.ele.style.width = _width;
      return this;
    } else {
      return this.ele.offsetWidth;
    }
  });

  handler.extend('height', function(_height) {
    if (_height) {
      this.ele.style.height = _height;
      return this;
    } else {
      return this.ele.offsetHeight;
    }
  });

  handler.extend('innerWidth', function() {
    return this.ele.clientWidth;
  });

  handler.extend('innerHeight', function() {
    return this.ele.clientHeight;
  });

})(J);

(function(handler) {

  handler.scrollTop = function(value) {
    if (value) {
      window.scrollTo(handler.scrollLeft(), value);
      return handler;
    } else {
      return window['pageYOffset'] || document.documentElement['scrollTop'];
    }
  };

  handler.scrollLeft = function(value) {
    if (value) {
      window.scrollTo(value, handler.scrollTop());
      return handler;
    } else {
      return window['pageXOffset'] || document.documentElement['scrollLeft'];
    }
  };

  handler.scrollTo = function(left, top) {
    window.scrollTo(left, top);
  };

  handler.extend('scrollLeft', function(value) {
    if (value) {
      this.ele.scrollLeft = value;
      return this;
    } else {
      return this.ele.scrollLeft;
    }
  });

  handler.extend('scrollTop', function(value) {
    if (value) {
      this.ele.scrollTop = value;
      return this;
    } else {
      return this.ele.scrollTop;
    }
  });

  handler.extend('scrollTo', function(left, top) {
    return this.scrollLeft(left).scrollTop(top);
  });

})(J);

(function(handler) {

  // getBoundingClientRect

  handler.extend('offsetTop', function(value) {
    if (value) {
      this.ele.offsetTop = value;
      return this;
    } else {
      return this.ele.offsetTop;
    }
  });

  handler.extend('offsetLeft', function(value) {
    if (value) {
      this.ele.offsetLeft = value;
      return this;
    } else {
      return this.ele.offsetLeft;
    }
  });

  handler.extend('offset', function(left, top) {
    if (left && top) {
      this.ele.offsetLeft = left;
      this.ele.offsetTop = top;
      return this;
    } else {
      left = this.ele.offsetLeft;
      top = this.ele.offsetTop;
      return {
        left: left,
        top: top
      };
    }
  });

})(J);

(function(wrapper) {

  var support = wrapper.support.getComputedStyle = !!(document.defaultView && document.defaultView["getComputedStyle"]);

  var Push = Array.prototype.push;

  function getComputedStylePixel(element, property, fontSize) {
    var value = element.currentStyle[property].match(/([\d\.]+)(%|cm|em|in|mm|pc|pt|)/) || [0, 0, ''],
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
    var borderSuffix = property == 'border' ? 'Width' : '',
      t = property + 'Top' + borderSuffix,
      r = property + 'Right' + borderSuffix,
      b = property + 'Bottom' + borderSuffix,
      l = property + 'Left' + borderSuffix;

    style[property] = (style[t] == style[r] && style[t] == style[b] && style[t] == style[l] ? [style[t]] :
      style[t] == style[b] && style[l] == style[r] ? [style[t], style[r]] :
      style[l] == style[r] ? [style[t], style[r], style[b]] :
      [style[t], style[r], style[b], style[l]]).join(' ');
  }

  function CSSSD(element) {
    var style = this,
      currentStyle = element.currentStyle,
      fontSize = getComputedStylePixel(element, 'fontSize');

    for (property in currentStyle) {
      Push.call(style, property === 'styleFloat' ? 'float' : property.replace(/[A-Z]/, function(match) {
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
    getPropertyValue: function(property) {
      return this[property.replace(/-\w/g, function(match) {
        return match[1].toUpperCase();
      })];
    },
    item: function(index) {
      return this[index];
    }
  };

  if (support) {
    wrapper.getStyles = function(element) {
      return element.ownerDocument.defaultView.getComputedStyle(element, null);
    };
  } else {
    wrapper.getStyles = function(element) {
      return new CSSSD(element);
    };
  }

  wrapper.setStyles = function(element, styles) {
    for (var s in styles) {
      if (styles.hasOwnProperty(s)) {
        element.style[s] = styles[s];
      }
    }
  }

})(J);

/**
 * Asynchronous JavaScript And JSON(P)
 * require('utils')
 * Aja()
 *  .url(url)
 *  .data(data)
 *  .method(method)
 *  .cache(cache)
 *  .go()
 *  .on('success', function(response) {})
 *  .on('fail', function(error) {})
 */
var Aja = (function() {

  "use strict";

  function Aja() {
    return api;
  }

  var api = {
    url: function(url) {},
    data: function(data) {},
    cache: function(useCache) {},
    method: function(method) {},
    on: function(event, handler) {}
  };

  return Aja;

})();
