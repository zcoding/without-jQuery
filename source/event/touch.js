(function(handler) {

  var $doc = handler(document);

  var swipeEvent = document.createEvent('Event');
  swipeEvent.initEvent('swipe', true, true);

  var swipeUpEvent = document.createEvent('Event');
  swipeUpEvent.initEvent('swipeup', true, true);

  var swipeDownEvent = document.createEvent('Event');
  swipeDownEvent.initEvent('swipedown', true, true);

  var swipeLeftEvent = document.createEvent('Event');
  swipeLeftEvent.initEvent('swipeleft', true, true);

  var swipeRightEvent = document.createEvent('Event');
  swipeRightEvent.initEvent('swiperight', true, true);

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
      event.originalEvent.target.dispatchEvent(swipeRightEvent);
    }
    if (deltaX < -50 && Math.abs(deltaY) < Math.abs(deltaX)) {
      stop = true;
      event.originalEvent.target.dispatchEvent(swipeLeftEvent);
    }
    if (deltaY > 50 && Math.abs(deltaX) < deltaY) {
      stop = true;
      event.originalEvent.target.dispatchEvent(swipeDownEvent);
    }
    if (deltaY < -50 && Math.abs(deltaX) < Math.abs(deltaY)) {
      stop = true;
      event.originalEvent.target.dispatchEvent(swipeUpEvent);
    }
  });

  $doc.on('touchend', function(event) {
    stop = false;
  });

})(J);
