var koa = require('koa');
var app = koa();
var serve = require('koa-static');
var path = require('path');

app.use(serve(path.resolve(__dirname, '../build')));

app.listen(10240);
