#!/usr/bin/env node

var port= 8081;
var res= new Buffer("HTTP/1.1 200 OK\nContent-Length: 4\nServer: NODE\n\nHOLA");

function callback (stream) {
  stream.end(res);
}

require('net').createServer(callback).listen(port);
console.log("NODE Server running on port "+ port);
