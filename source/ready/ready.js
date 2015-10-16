(function(handler) {

  document.removeEventListener('DOMContentLoaded');

  handler.ready = new iPromise(function(_resolve, _reject) {
    document.addEventListener('DOMContentLoaded', function() {
      _resolve('loaded');
    });
  });

})(J);
