#!/usr/bin/env node
//201003xx jorge@jorgechamorro.com

var sys= require("sys");
var http= require("http");
var port= 12345;

http.createServer(function (request, response) {
  var time= +new Date();
  
  if (request.url === "/favicon.ico") {
    response.writeHeader(404, {});
    response.write("");
  } else {
    response.writeHeader(200, {"Content-Type": "text/plain", "server":"Node.js"});
    response.write(sys.inspect(global, true, null));
  }
  response.close();
}).listen(port);

sys.puts("Server running at http://localhost:"+ port+ "/");