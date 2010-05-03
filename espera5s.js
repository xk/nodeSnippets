var sys= require("sys");
var http= require("http");
var port= 12345;

function computeAnswer (time) {
  var ctr= 0;
  var ms= +time.ms + (+time.s * 1e3);
  var exitTime= +new Date()+ ms;
  while (exitTime > +new Date()) {
    ctr++;
  }
  return (ctr/ms/1e3).toFixed(2)+"MHz";
}

function server (request, response, t, n) {
  if (request.url.toLowerCase().indexOf("/favicon") >= 0) {
    response.writeHeader(404, {});
  } else {
    response.writeHeader(200, {"Content-Type":"text/plain"});
    response.write(computeAnswer({s:5,ms:0}));
  }
  response.close();
}

http.createServer(server).listen(port);
sys.puts("Server running at http://localhost:"+ port+ "/");
