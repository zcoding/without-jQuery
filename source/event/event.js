(function(handler) {

  var support = handler.support.addEventListener = !!document['addEventListener'];

  function attachEvent(element, eventType, callback) {
    element.addEventListener(eventType, callback, false);
  }

  if (!support && !handler.fuck.ie) {
    var attachEvent = function(element, eventType, callback) {
      if (element['addEventListener']) {
        element.addEventListener(eventType, callback, false);
      } else if (element['attachEvent']) {
        element.attachEvent('on' + eventType, callback);
      } else {
        element['on'+eventType] = callback;
      }
    }
  }

  function JEvent(originalEvent, data) {
    this.originalEvent = originalEvent;
    this.data = data;
  }

  /**
   * 创建自定义事件
   */
  handler.event = function(name) {
    var evt = document.createEvent('Event');
    evt.initEvent(name, true, true);
    return evt;
  };

  /**
   * 添加事件监听
   * TODO: 1.命名空间;2.选择器
   */
  handler.extend('on', function(eventType, eventData, callback) {
    if (typeof(eventData) === 'function') {
      callback = eventData;
      eventData = null;
    }
    var cbs = this.event_callbacks[eventType];
    var $this = this;
    if (!cbs) {
      cbs = this.event_callbacks[eventType] = [];
      attachEvent(this.ele, eventType, function(event) {
        cbs.forEach(function(cb) {
          cb.call($this, event);
        });
      });
    }
    this.event_callbacks[eventType].push(function(event) {
      callback.call(this, new JEvent(event, eventData));
    });
    return this;
  });

  /**
   * 解除事件绑定
   * TODO: 解除特定callback
   */
  handler.extend('off', function(eventType, callback) {
    var cbs = this.event_callbacks[eventType];
    if (!cbs) return this;
    cbs.splice(0, cbs.length);
    cbs = null;
    return this;
  });

  /**
   * 触发事件，包括原生事件或自定义事件
   */
  handler.extend('trigger', function(eventType) {
    var evt = document.createEvent('Event');
    evt.initEvent(eventType, true, true);
    this.ele.dispatchEvent(evt);
    return this;
  });

  var shortnames = ['click', 'swipeUp', 'swipeDown', 'swipeLeft', 'swipeRight'];

  shortnames.forEach(function(eventType) {
    var eventName = eventType.toLowerCase();
    handler.extend(eventType, function(eventData, callback) {
      if (!eventData && !callback) {
        return this.trigger(eventName);
      } else {
        return this.on(eventName, eventData, callback);
      }
    });
  });

})(J);
