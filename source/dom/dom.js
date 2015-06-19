var $ = (function() {

  function DC() {}

  var Query = function(selector) {
    return new DC(document.querySelectorAll(selector));
  };

  var  prtt = Query.prototype;

  return Query;

})();
