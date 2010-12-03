#!/usr/bin/env node

function rnd (n) { return Math.floor(n* Math.random()) }

var words= "Con diez cañones por banda viento en\
 popa a toda vela no corta el mar si no vuela un\
 velero bergantín bajel pirata llamado por su bravura\
 el temido en todo el mar conocido del uno al otro confín".toLowerCase().split(" ");

var words_length = words.length;

function poema (length, r, curr, prev, l) {
  r= [];
  l= 0;
  while (l < length) {
    do curr= words[rnd(words_length)]; while (curr === prev);
    r.push(prev= curr);
    l+= prev.length+ 1;
  }
  return r.join(" ");
}

var port= 8081;
require('http').createServer(callback).listen(port);
var res= new Buffer("HOLA");
var headers= {Server: "NODE", "Content-Length": res.length, "Connection": "close"};
function callback (request, response) {
  response.writeHead(200, headers);
  response.end(res);
}

console.log("NODE Server running on port "+ port);
