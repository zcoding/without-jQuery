#style
##How to get styles
###IE8+
```javascript
var styles = element.ownerDocument.defaultView.getComputedStyle(element, null);
```
###IE8 and below
```javascript
var styles = element.currentStyle; // issue: it's not computed
```

##How to set styles
###The best way: use inline style
```javascript
element.style[prop] = value; // all browsers support well
```
