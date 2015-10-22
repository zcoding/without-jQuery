(function(handler) {

  var encode = encodeURIComponent, decode = decodeURIComponent;

  var getItem = function (sKey) {
    if (!sKey) {
      return null;
    }
    var matcher = new RegExp("(?:(?:^|.*;)\\s*" + encode(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$");
    return decode(document.cookie.replace(matcher, "$1")) || null;
  };

  var setItem = function (sKey, sValue, options) {
    options = options || {};
    var vEnd = options.vEnd, sPath = options.sPath, sDomain = options.sDomain, bSecure = options.bSecure;

    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encode(sKey) + "=" + encode(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  };

  var removeItem = function (sKey, sPath, sDomain) {
    if (!hasItem(sKey)) { return false; }
    document.cookie = encode(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
    return true;
  };

  var hasItem = function (sKey) {
    if (!sKey) {
      return false;
    }
    return (new RegExp("(?:^|;\\s*)" + encode(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  };

  var getKeys = function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) {
      aKeys[nIdx] = decode(aKeys[nIdx]);
    }
    return aKeys;
  };

  handler.cooker = {
    getItem: getItem,
    setItem: setItem,
    removeItem: removeItem,
    hasItem: hasItem,
    getKeys: getKeys
  };

})(J);
