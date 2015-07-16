var koa = require('koa');
var app = koa();
var router = require('koa-router')();
var serve = require('koa-static');
var path = require('path');
var views = require('co-views');

var render = views(__dirname + '/../demo/', {
  map: { html: 'swig' }
});

function *responseTime(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
};

function *pageNotFound(next){
  yield next;

  if (404 != this.status) return;

  // we need to explicitly set 404 here
  // so that koa doesn't assign 200 on body=
  this.status = 404;

  switch (this.accepts('html', 'json')) {
    case 'html':
      this.type = 'html';
      this.body = '<h1>Page Not Found</h1>';
      break;
    case 'json':
      this.body = {
        message: 'Page Not Found'
      };
      break;
    default:
      this.type = 'text';
      this.body = 'Page Not Found';
  }
}

router.get('/', function *(next) {
  this.body = yield render('index');
});
router.get('/ajax', function *(next) {
  this.body = yield render('demo-ajax');
});

app.use(serve(path.resolve(__dirname, '../build')))
  .use(responseTime)
  .use(router.routes())
  .use(router.allowedMethods())
  .use(pageNotFound);

app.listen(9090);
