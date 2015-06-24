/**
 * require('utils')
 */

function getXMLHttpRequest()
{
   if (window.XMLHttpRequest) {
       return new window.XMLHttpRequest;
   } else {
       try {
           return new ActiveXObject("MSXML2.XMLHTTP.3.0");
       }
       catch(ex) {
           return null;
       }
   }
}

var Ajax = function(url) {

  "use strict";

  var core = {
    ajax: function(method, url, args) {

      var http = getXMLHttpRequest();

      var data = null;

      var argsType = typeof args;

      if (argsType === 'string') {
        if (method === 'POST' || method === 'PUT') {
          data = args;
        } else {
          url += '?' + args;
        }
      } else if (argsType !== 'undefined') {
        if (method === 'POST' || method === 'PUT') {
          data = utils.query.stringify(args);
        } else {
          url += '?' + utils.query.stringify(args);
        }
      }

      http.open(method, url, true);

      if (method === 'POST' || method === 'PUT') {
        http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      }

      http.onreadystatechange = function() {
        if (http.readyState === 4) { // complete
          if (http.status >= 200 && http.status < 400) {
            // done
          } else {
            // fail
          }
        }
      }

      http.send(data);

      retrun api;

    }
  };

  var api = {
    done: function() {
      return this;
    },
    fail: function() {
      return this;
    }
  }

  return {
    "get": function(data) {
      return core.ajax('GET', url, data);
    },
    "post": function(data) {
      return core.ajax('POST', url, data);
    },
    "put": function(data) {
      return core.ajax('PUT', url, data);
    },
    "delete": function(data) {
      core.ajax('DELETE', url, data)
    }
  };

};
