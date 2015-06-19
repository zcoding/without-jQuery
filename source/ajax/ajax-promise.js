function Ajax(url) {

  "use strict";

  var core = {

    ajax : function (method, url, args) {

      var promise = new Promise( function (resolve, reject) {

        var client = new XMLHttpRequest();
        var uri = url;

        if (method === 'POST' || method === 'PUT') {
          client.setHeader('Content-Type', 'application/x-www-form-urlencoded');
        }

        if (args && (method === 'POST' || method === 'PUT')) {
          uri += '?';
          var argcount = 0;
          for (var key in args) {
            if (args.hasOwnProperty(key)) {
              if (argcount++) {
                uri += '&';
              }
              uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
            }
          }
        }

        client.open(method, uri, true);
        client.send();

        client.onload = function () {
          if (this.status >= 200 && this.status < 400) {
            resolve(this.response);
          } else {
            reject(this.statusText);
          }
        };
        client.onerror = function () {
          reject(this.statusText);
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
