//http://catonmat.net/http-proxy-in-nodejs
//modificado por jorge@jorgechamorro.com

var http = require('http');
var sys = require('sys');
var Buffer= require('buffer').Buffer;
var cache= {};

function stringToBuffer(string) {
  var buffer = new Buffer(Buffer.byteLength(string));
  buffer.utf8Write(string);
  return buffer;
}

http.createServer(function (request, response) {
  var logTxt= "";
  var cached= cache[request.url];
  
  if (cached) {
    
    logTxt+= "fromCache:";
    response.writeHead(200, cached.headers);
    response.write(cached.response);
    response.end();
    
  } else {
    
    logTxt+= "requested:";
    var proxy = http.createClient(80, request.headers['host'])
    var proxy_request = proxy.request(request.method, request.url, request.headers);
    var cacheItem;
    if (request.method === "GET") cacheItem= { response: "", headers: "" };
    
    proxy_request.addListener('response', function (proxy_response) {
      
      proxy_response.addListener('data', function (chunk) {
        cacheItem && (cacheItem.response.push(stringToBuffer(chunk)));
        response.write(chunk);
      });
      
      proxy_response.addListener('end', function () {
        response.end();
        //cacheItem && (cache[request.url]= cacheItem);
      });
      
      cacheItem && (cacheItem.headers= proxy_response.headers);
      response.writeHead(proxy_response.statusCode, proxy_response.headers);
    });
    
    request.addListener('data', function (chunk) {
      proxy_request.write(chunk);
    });
    
    request.addListener('end', function () {
      proxy_request.end();
    });
  }
  sys.puts(logTxt+request.url);
}).listen(8080);