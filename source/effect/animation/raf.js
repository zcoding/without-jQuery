(function(handler) {

  var support = handler.support.requestAnimationFrame = !!window['requestAnimationFrame'];

  function raf() {}

  handler.raf = support ? window['requestAnimationFrame'] : raf;

})(J);
