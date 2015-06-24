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
