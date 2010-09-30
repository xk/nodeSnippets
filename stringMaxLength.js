//#!/usr/bin/env node
//20100507 jorge@jorgechamorro.com
//Calcula el tamaño máximo que puede tener una string
//uso: node stringMaxLength.js

function rndStr (len) {
  var str= "";
  while (str.length < len) {
    str+= String.fromCharCode(32+ Math.floor(Math.random()* 96));
  }
  return str;
}

var baseMem;
var testStr= "";
var global= (function () { return this })();

if (global.process && global.process.memoryUsage) {
  baseMem= global.process.memoryUsage().heapTotal;
}

(function loop () {
  testStr+= rndStr(512*1024);
  var txt= "str.length -> "+ (testStr.length / (1024*1024)).toFixed(1) + " MB";
  if (global.process && global.process.memoryUsage) {
    txt+= ", heap \u2206 -> +"+ ((global.process.memoryUsage().heapTotal- baseMem) / (1024*1024)).toFixed(1)+ " MB";
  }
  console.log(txt);
  setTimeout(loop, 0);
})();

