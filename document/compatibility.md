#常用兼容性速查表
##window.requestAnimationFrame()
+ IE10
##Element.getBoundingClientRect()
> [In IE8 and below, the DOMRect object returned by getBoundingClientRect() lacks height and width properties. Also, additional properties (including height and width) cannot be added onto these DOMRect objects.](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect#Browser_compatibility)

+ IE9

##Element.classList
+ IE10

代替：Element.className

##ParentNode.children
+ IE9

代替：Node.childNodes
