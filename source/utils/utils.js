var utils = (function() {

  "use strict";

  var decodeC = win.decodeURIComponent
  , encodeC = win.encodeURIComponent
  , oprtt = Object.prototype
  , hasOwn = oprtt.hasOwnProperty
  , isArray = function(obj) {
    return oprtt.toString.call(obj) === '[object Array]';
  };

  var utils = {};

  /**
   * type check
   * .is('Array')
   * .is('Function')
   * .is('PlainObject')
   * .is('IE')
   * .is('chrome')
   * .is('firefox')
   * .is('safari')
   * .is('iOS')
   * .is('Android')
   * .is('WP')
   */
  utils.is = function() {};

  utils.query = {
    /**
     * query stringify
     * @param {Object} query
     */
    stringify: function(obj) {
      if (!obj) {
        return '';
      }
      var keys = [];
      for (var p in obj) {
        if (hasOwn.call(obj, p)) {
          keys.push(p);
        }
      }

      keys.sort();

      var parts = [];
      for (var i = 0, len1 = keys.length; i < len1; ++i) {
        var key = keys[i];
        var val = obj[key];

        if (isArray(val)) {
          val.sort();
          var _parts = [];
          for (var j = 0, len2 = val.length; j < len2; ++j) {
            _parts.push(encodeC(key) + '=' + encodeC(val[j]));
          }
          parts.push(_parts.join('&'));
          continue;
        }
        parts.push(encodeC(key) + '=' + encodeC(val));
      }
      return parts.join('&');
    },
    /**
     * parse queryString
     * @param {Object} queryString
     */
    parse: function(queryString) {
      if (typeof queryString !== 'string') {
        return {};
      }

      queryString = queryString.replace(/^\s*|\s*$/g, '').replace(/^(\?|#)/, '');

      if (!queryString) {
        return {};
      }

      var queryParts = queryString.split('&');

      var query = {};

      for (var i = 0, len = queryParts.length; i < len; ++i) {
        var parts = queryParts[i].replace(/\+/g, ' ').split('='); // 特殊字符`+`转换为空格
        var key = parts[0];
        var val = parts[1];

        key = decodeC(key);

        val = val === undefined ? null : decodeC(val);

        if (!hasOwn.call(query, key)) { // key第一次出现，作为Object的key
          query[key] = val;
        } else if (isArray(query[key])) { // key不是第一次出现，原来的key对应的value为数组，将val作为数组元素加入
          query[key].push(val);
        } else {
          query[key] = [query[key], val]; // key不是第一次出现，原来的key对应的value非数组，将原来的值和val作为数组元素构造成数组
        }
      }

      return query;
    }
  };

  // utils.parseJSON => JSON.parse

  return utils;

})();
