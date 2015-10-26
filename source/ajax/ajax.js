(function(handler) {

  "use strict";

  var iPromsie = handler.support.promise ? Promise : handler.iPromise;

  if (!iPromise) {
    throw new TypeError('Promises not supported.');
  }

  /* if fuck-ie */
  var XHR = null;
  function getXMLHttpRequest() {
    if (XHR) {
      return XHR();
    }
    if (window.XMLHttpRequest) {
      XHR = function() {
        return new window.XMLHttpRequest();
      };
    } else {
      try {
        XHR = function() {
          return new ActiveXObject("MSXML2.XMLHTTP.3.0");
        };
      } catch (ex) {
        XHR = function() {
          throw new TypeError('Ajax not supported.');
        };
      }
    }
    return XHR();
  }
  /* else */
  function getXMLHttpRequest() {
    return new window.XMLHttpRequest();
  }
  /* endif */

  handler.ajax = function(url) {

    var core = {

      ajax : function (method, url, args) {

        var promise = new iPromise( function (_resolve, _reject) {

          var http = getXMLHttpRequest();
          if (http === null) {
            throw new TypeError('XHR NOT SUPPORTED');
          }

          var uri = url;

          var data = null;

          if (args && (method === 'POST' || method === 'PUT')) {
            if (typeof args === 'string') {
              data = args;
            } else {
              data = utils.query.stringify(args);
            }
          } else {
            if (typeof args === 'string') {
              uri += '?' + args;
            } else {
              uri += '?' + utils.query.stringify(args);
            }
          }

          http.open(method, uri, true);

          if (method === 'POST' || method === 'PUT') {
            http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          }

          http.send(data);

          http.onload = function () {
            if (this.status >= 200 && this.status < 400) {
              _resolve(this.responseText);
            } else {
              _reject(this, this.status, this.statusText);
            }
          };
          http.onerror = function () {
            _reject(this, this.status, this.statusText);
          };
        });

        return promise;
      }
    };

    return {
      'get' : function(args) {
        return core.ajax('GET', url, args);
      },
      'post' : function(args) {
        return core.ajax('POST', url, args);
      },
      'put' : function(args) {
        return core.ajax('PUT', url, args);
      },
      'delete' : function(args) {
        return core.ajax('DELETE', url, args);
      }
    };

  };

})(J);
