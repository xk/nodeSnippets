//#!/usr/bin/env node
//20100507 jorge@jorgechamorro.com
//Calcula el tamaño máximo que puede tener una string
//uso: node stringMaxLength.js

function rnd (n) {
  return Math.floor(Math.random()* n);
}

function rndStr (len) {
  var str= "";
  while (str.length < len) {
    str+= String.fromCharCode(32+ Math.floor(Math.random()* 96));
  }
  str[0];
  return str;
}

var baseMem;
var testStr= "";
var global= (function () { return this })();

var pool= [
rndStr(1024*1024),
rndStr(1024*1024)
];

if (global.process && global.process.memoryUsage) {
  baseMem= global.process.memoryUsage().heapUsed;
}

(function loop () {
  testStr+= pool[rnd(pool.length)];
  var txt= "str.length -> "+ (testStr.length / 1e6).toFixed(1) + "e6 chars";
  if (global.process && global.process.memoryUsage) {
    var flatten= Math.random() < .1;
    if (flatten) {
      testStr[testStr.length-1];
    }
    txt+= ", heap \u2206 -> +"+ ((global.process.memoryUsage().heapUsed- baseMem) / (1024*1024)).toFixed(1)+ " MB";
    if (flatten) txt+= " *** flattened";
  }
  console.log(txt);
  setTimeout(loop, 99);
})();
