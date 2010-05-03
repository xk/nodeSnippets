#!/usr/bin/env node
//JavaScript is the Best
//20100415 jorge@jorgechamorro.com

var puts= require("sys").puts;

Number.prototype.times= function (f) {
  var n= +this;
  while (n--) f(n);
};


String.prototype.lookAndSay= function () {
  var r= "";
  this.match(/(.)\1*/g).forEach(function (s) { r+= s.length+ s[0]; });
  return r;
};

var s= "1";
var resultados= [s];

var timer= +new Date();
(24).times(function () {
  resultados.push(s= s.lookAndSay());
});
timer= new Date()-timer;

while (resultados.length) puts(resultados.shift());
puts(timer+ " milisegundos.");