/**
 * require('utils')
 */
function Ajax(url) {

  "use strict";

  var core = {

    ajax : function (method, url, args) {

      var promise = new Promise( function (resolve, reject) {

        var http = new XMLHttpRequest();
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
            resolve(this.responseText);
          } else {
            reject(this, this.status, this.statusText);
          }
        };
        http.onerror = function () {
          reject(this, this.status, this.statusText);
        };
      });

      // Return the promise
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
