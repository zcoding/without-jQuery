var XHRcache = null;

function getXMLHttpRequest() {
  if (XHRcache !== null) {
    return XHRcache;
  }
  if (window.XMLHttpRequest) {
    XHRcache = window.XMLHttpRequest;
  } else {
    try {
      XHRcache = new ActiveXObject("MSXML2.XMLHTTP.3.0");
    } catch (ex) {
      XHRcache = null;
    }
  }
  return XHRcache;
}

function Ajax(url) {

  "use strict";

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
