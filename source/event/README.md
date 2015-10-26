# 事件系统

## 鼠标和触屏事件触发的先后顺序
1. touchstart
2. touchmove
3. touchend
4. mouseover
5. mousemove
6. mousedown
7. mouseup
8. click

从1到8存在300ms间隔，也就是click事件的300ms延迟

## 拓展的触屏事件
+ `tap`
+ `doubletab`
+ `swipe`
+ `swipeup`
+ `swipedown`
+ `swipeleft`
+ `swiperight`
+ `dragstart`
+ `dragend`
+ `rotate`
+ `pinch`
+ `hold`

注意：
1. 如果只兼容移动端，请使用tab代替click
2. 如果要兼容移动端和PC端，请使用fastclick
