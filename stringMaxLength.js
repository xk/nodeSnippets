//#!/usr/bin/env node
//20100507 jorge@jorgechamorro.com
//Calcula el tamaño máximo que puede tener una string
//uso: node stringMaxLength.js
//En mi Mac da error al llegar a 1GB (1024MB)

var sys= require("sys");
var str1M= (function () {
  var s= "0";
  while (s.length < (1024*1024)) s+= s;
  return s;
})();

var testStr= "";
sys.puts(str1M.length);
(function loop (RUN) {
  sys.puts((((testStr+= str1M).length / (1024*1024)) >>> 0)+ "MB");
  process.nextTick(loop);
})();


