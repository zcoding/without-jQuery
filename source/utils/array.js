/**
 * 提供数组操作的快捷方法
 */
(function(handler) {

  handler.support.forEach = !!Array.prototype.forEach;

  var _ = {};

  _.each = handler.each = handler.support.forEach ? function(arr, callback) { Array.prototype.forEach.call(arr, callback); } : function(arr, callback) {
    for (var i = 0; i < arr.length; ++i) {
      callback.call(arr, arr[i], i, arr);
    }
  };

})(J);
