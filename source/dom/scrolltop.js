function getScrollTop() {

  // console.log('window.scrollY: ' + window.scrollY);
  // IE5/6/7/8/9/10/11: undefined

  // console.log('window.pageYOffset: ' + window.pageYOffset);
  // IE5/6/7/8: undefined

  // console.log('document.documentElement.scrollTop: ' + document.documentElement.scrollTop);
  // chrome: 0
  // safari: 0
  // opera: 0
  // IE5: 0

  // console.log('document.body.scrollTop: ' + document.body.scrollTop);
  // firefox: 0
  // IE6/7/8/9/10/11: 0

  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  // chrome/firefox/IE9/10/11直接返回window.pageYOffset
  // IE6/7/8判断一次
  // IE5判断两次

  // 兼容IE8+的写法：
  // return window['pageYOffset'] || document.documentElement['scrollTop'];

}

// IE5只支持document.body.scrollTop
// IE7/8只支持document.documentElement.scrollTop
// IE9/10/11支持document.documentElement.scrollTop || window.pageYOffset
// chrome/safari/opera支持document.body.scrollTop || window.scrollY || window.pageYOffset
// firefox支持document.documentElement.scrollTop || window.scrollY || window.pageYOffset

// window.scrollY只是window.pageYOffset的别名，但是scrollY比较新，兼容性更差

function getScrollLeft() {
  return window['pageXOffset'] || document.documentElement['scrollLeft'];
}

function setScrollTop(value) {
  window.scrollTo(getScrollLeft(), value);
}

function setScrollLeft(value) {
  window.scrollTo(value, getScrollTop());
}

function getElementScrollTop(element) {
  return element.scrollTop;
}

function setElementScrollTop(element, value) {
  element.scrollTop = value;
}

function scrollTop(element, value) {
  if (value === undefined) {
    return element === window ? getScrollTop() : getElementScrollTop(element);
  } else {
    return element === window ? setScrollTop(value) : setElementScrollTop(element, value);
  }
}
