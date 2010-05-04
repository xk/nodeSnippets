#!/usr/bin/env node
//20100412 jorge@jorgechamorro.com

var kCuantos= 5e3;
var kLength= 16*1024;
var ctr= 0;
var now= +new Date();
var puts= print;

function rnd (n) {
  return (n* Math.random()) >>> 0;
}

var words= "Con diez cañones por banda viento en popa a toda vela no corta el mar si no vuela un velero bergantín bajel pirata llamado por su bravura el temido en todo el mar conocido del uno al otro confín".toLowerCase().split(" ");

function poeta (length, poema, curr, prev) {
  poema= "";
  while (poema.length < length) {
    do {
      curr= words[rnd(words.length)];
    } while (curr === prev);
    poema+= (prev= curr)+ " ";
  }
  ctr++;
  return poema;
}

var poemas= [];
while (ctr < kCuantos) {
  //poemas.push(poeta(kLength));
  poeta(kLength);
}

Number.prototype.to_s= function (p) {
  return (this / 1e3).toFixed(p);
};

puts(kCuantos+ " poemas de "+ kLength+ " caracteres.");
puts((now= (new Date()- now).to_s(1))+ " segundos.");
puts((kCuantos/ now).toFixed(1)+ " poemas / segundo.");
