#!/usr/bin/env node
//201003xx jorge@jorgechamorro.com

var sys= require("sys");
var http= require("http");
var port= 12345;
var hits= 0;
var poema= "con diez cañones por banda viento en popa a toda vela no corta el mar si no vuela un velero bergantín bajel pirata que llaman por su bravura el temido en todo el mar conocido del uno al otro confín desde la cumbre bravía que el sol indio tornasola hasta el África que inmola sus hijos en torpe guerra que no hay un puñado de tierra sin una tumba española Asia a un lado al otro Europa y allá a su frente Estambul".split(" ");

http.createServer(function (request, response) {
  
  response.writeHeader(200, {
    "Content-Type": "text/html",
    "server":"Node.js"
  });
  
  var txt= "<html><body><h1>"+ (++hits)+ "</h1>";
  var palabro, palabroAnterior= poema[(Math.random()* poema.length) >>> 0];
  while (txt.length < 1024) {
    do {
      palabro= poema[(Math.random()* poema.length) >>> 0];
    } while (palabro === palabroAnterior);
    txt+= (palabroAnterior= palabro)+ " ";
  }
  response.write(txt+ "</body></html>");
  response.close();
  
}).listen(port);

sys.puts("Server running at http://localhost:"+ port+ "/");
