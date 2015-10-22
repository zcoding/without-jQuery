(function(handler) {

  var $doc = handler(document);

  var eventMap = {};

  var eventList = ['swip', 'swipeup', 'swipedown', 'swipeleft', 'swiperight', 'drag', 'dragstart', 'dragend', 'tab', 'doubletab', 'hold', 'rotate'];

  handler.each(eventList, function(eventName) {
    eventMap[eventName] = handler.event(eventName);
  });

  var startX = 0, startY = 0;

  $doc.on('touchstart', function(event) {
    var touches = event.originalEvent.touches;
    startX = touches[0].pageX;
    startY = touches[0].pageY;
  });

  var stop = false;

  $doc.on('touchmove', function(event) {
    if (stop) return true;
    var touches = event.originalEvent.touches;
    var deltaX = touches[0].pageX - startX;
    var deltaY = touches[0].pageY - startY;
    if (deltaX > 50 && Math.abs(deltaY) < deltaX) {
      stop = true;
      event.originalEvent.target.dispatchEvent(eventMap['swiperight']);
    }
    if (deltaX < -50 && Math.abs(deltaY) < Math.abs(deltaX)) {
      stop = true;
      event.originalEvent.target.dispatchEvent(eventMap['swipeleft']);
    }
    if (deltaY > 50 && Math.abs(deltaX) < deltaY) {
      stop = true;
      event.originalEvent.target.dispatchEvent(eventMap['swipedown']);
    }
    if (deltaY < -50 && Math.abs(deltaX) < Math.abs(deltaY)) {
      stop = true;
      event.originalEvent.target.dispatchEvent(eventMap['swipeup']);
    }
  });

  $doc.on('touchend', function(event) {
    stop = false;
  });

})(J);
