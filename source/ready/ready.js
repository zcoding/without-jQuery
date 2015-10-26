(function(handler) {

  var iPromise = handler.support.promise ? window.Promise : handler.iPromise;

  document.removeEventListener('DOMContentLoaded');

  handler.readyPromise = new iPromise(function(_resolve, _reject) {
    document.addEventListener('DOMContentLoaded', function() {
      _resolve('loaded');
    });
  });

  handler.ready = function(callback) {
    return handler.readyPromise.then(callback);
  };

})(J);
