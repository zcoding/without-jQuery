(function(handler) {

  handler.extend('val', function(value) {
    var ele = this.ele;
    if (ele.nodeType !== 1 || typeof ele.value === 'undefined') {
      return '';
    }
    if (typeof value === 'undefined') {
      return ele.value;
    } else {
      ele.value = value;
      return ele;
    }
  });

})(J);
