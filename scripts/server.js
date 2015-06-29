var http = require('http');
var accepts = require('accepts');

var PORT = 9090;

function app(req, res) {
  var accept = accepts(req);

  switch(accept.type(['json', 'html'])) {
    case 'json':
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify({"hello":"world!"}));
      break;
    case 'html':
      res.setHeader('Content-Type', 'text/html');
      res.write('<b>hello, world!</b>');
      break;
    default:
      res.setHeader('Content-Type', 'text/plain');
      res.write('hello, world!');
      break;
  }

  res.end();
}

var server = http.createServer(app);

server.listen(PORT);
