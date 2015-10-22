(function(handler) {

  var decodeC = window.decodeURIComponent
  , encodeC = window.encodeURIComponent
  , oprtt = Object.prototype
  , hasOwn = oprtt.hasOwnProperty
  , isArray = Array.isArray ? Array.isArray : function(obj) {
    return oprtt.toString.call(obj) === '[object Array]';
  };

  handler.query = {
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
        var parts = queryParts[i].replace(/\+/g, ' ').split('=');
        var key = parts[0];
        var val = parts[1];

        key = decodeC(key);

        val = val === undefined ? null : decodeC(val);

        if (!hasOwn.call(query, key)) {
          query[key] = val;
        } else if (isArray(query[key])) {
          query[key].push(val);
        } else {
          query[key] = [query[key], val];
        }
      }

      return query;
    }
  };
})(J);
