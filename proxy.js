#!/usr/bin/env node
//201003xx jorge@jorgechamorro.com
//http://catonmat.net/http-proxy-in-nodejs
//modificado por jorge@jorgechamorro.com

var http = require('http');
var sys = require('sys');
var Buffer= require('buffer').Buffer;
var cache= {};

function log (txt) {
  sys.puts(txt.substr(0,60));
}

http.createServer(function (request, response) {
  var logTxt= request.method+":"+request.url.substr(0,80);
  var cached= cache[request.url];
  var cacheItem;
  
  if (cached && (request.method === "GET")) {

    response.writeHead(200, cached.headers);
    var i= 0;
    while (i < cached.chunks.length) {
      var chunk= cached.chunks[i++];
      response.write(chunk);
    }
    response.end();
    log("["+cached.chunks.length+"]chunks:fromCache:"+logTxt);
  } else {

    var proxy = http.createClient(80, request.headers['host'])
    var proxy_request = proxy.request(request.method, request.url, request.headers);
    
    if (request.method === "GET") {
      cacheItem= { chunks: [], headers: "" };
    }

    proxy_request.addListener('response', function (proxy_response) {
      if (proxy_response.statusCode !== 200) cacheItem= null;

      proxy_response.addListener('data', function (chunk) {
        if (cacheItem) cacheItem.chunks.push(chunk);
        response.write(chunk);
        sys.print(".");
      });

      proxy_response.addListener('end', function () {
        if (cacheItem) {
          cache[request.url]= cacheItem;
          log("    CACHED:["+proxy_response.statusCode+"]:"+logTxt);
        } else {
          log("NOT CACHED:["+proxy_response.statusCode+"]:"+logTxt);
        }
        response.end();
      });

      if (cacheItem) cacheItem.headers= proxy_response.headers;
      response.writeHead(proxy_response.statusCode, proxy_response.headers);
    });

    request.addListener('data', function (chunk) {
      proxy_request.write(chunk);
    });

    request.addListener('end', function () {
      proxy_request.end();
    });
  }
  
}).listen(8080);