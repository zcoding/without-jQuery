(function(handler) {

  handler.extend('append', function(elements) {
    if (handler.is(handler.TYPE, elements)) {
      this.ele.appendChild(elements.ele);
    } else if (handler.is('String', elements)) {
      return this.append(handler(elements));
    } else {
      this.ele.appendChild(elements);
    }
    return this;
  });

  handler.extend('prepend', function(elements) {
    if (handler.is(handler.TYPE, elements)) {
      this.ele.insertAdjacentHTML('afterbegin', elements.ele);
    } else if (handler.is('String', elements)) {
      return this.prepend(handler(elements));
    } else {
      this.ele.insertAdjacentHTML('afterbegin', elements);
    }
    return this;
  });

  handler.extend('before', function() {});

  handler.extend('after', function() {});

  handler.extend('parent', function() {
    return handler(this.ele.parentNode);
  });

  handler.extend('children');

  handler.extend('siblings');

  handler.extend('html', function(value) {
    if (value) {
      this.ele.innerHTML = value;
      return this;
    } else {
      return this.ele.innerHTML;
    }
  });

  handler.extend('remove', function(selector) {

  });

  handler.extend('empty', function() {
    this.ele.innerHTML = '';
    return this;
  });

})(J);
