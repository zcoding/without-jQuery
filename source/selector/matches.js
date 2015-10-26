(function(handler) {

  handler.extend('matches', function(selectors) {
    var matchesSelector = element.matches || element.webkitMatchesSelector || element.mozMatchesSelector || element.oMatchesSelector || element.matchesSelector;
    return matchesSelector.call(this.ele, selectors);
  });

})(J);
