//20100505 jorge@jorgechamorro.com
//5000 poemas de 8192 caracteres.
//2.1 segundos.
//2369.7 poemas / segundo.


var puts= require("sys").puts;
var kCuantos= 5e3;
var kLength= 8192;
var ctr= 0;
var now= +new Date();

function rnd (n) { return (n* Math.random()) >>> 0; }

var words= "Con diez cañones por banda viento en popa a toda vela no corta el mar si no vuela un velero bergantín bajel pirata llamado por su bravura el temido en todo el mar conocido del uno al otro confín".toLowerCase().split(" ");

function poeta (length, r, curr, prev, l) {
  r= [];
  l= 0;
  while (l < length) {
    do curr= words[rnd(words.length)]; while (curr === prev);
    r.push(prev= curr);
    l+= prev.length+ 1;
  }
  ctr++;
  return r.join(" ");
}

while (ctr < kCuantos) poeta(kLength);

puts(kCuantos+ " poemas de "+ kLength+ " caracteres.");
puts((now= (+new Date()- now)/1e3).toFixed(1)+ " segundos.");
puts((kCuantos/ now).toFixed(1)+ " poemas / segundo.");
