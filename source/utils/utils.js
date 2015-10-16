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
