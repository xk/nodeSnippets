#!/usr/local/bin/node
//jorge@jorgechamorro.com
//Compara la velocidad de recuersión usando arguments.callee vs usando una función con nombre.

var sys= require("sys");

var k1= 2e3;
var ctr;

function benchmark (f) {
  ctr= 0;
  var n= k1;
  var now= +new Date();
  while (n--) f(k1);
  sys.puts(f.name+ ": "
    + (ctr/(+new Date()- now)/1e3).toFixed(3)
    + "MHz");
}

benchmark(function slow (i) {
  ctr++;
  while (--i) arguments.callee();
});

benchmark(function fast (i) {
  ctr++;
  while (--i) fast();
});