var ready = (function() {

  document.removeEventListener('DOMContentLoaded');

  var load = new Promise(function(resolve, reject) {
    document.addEventListener('DOMContentLoaded', function() {
      resolve('loaded');
    });
  });

  return function (cb) {
    load.then(cb);
  };

})();
