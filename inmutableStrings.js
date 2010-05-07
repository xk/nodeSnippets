//#/usr/bin/env node
//20100505 jorge@jorgechamorro.com
//

var sys= require("sys");
Number.prototype.times= function (f) {
  var n= +this;
  while (n--) f();
};

function rnd (n) { return (n* Math.random()) >>> 0; }

var words= "Con diez cañones por banda viento en popa a toda vela no corta el mar si no vuela un velero bergantín bajel pirata llamado por su bravura el temido en todo el mar conocido del uno al otro confín".toLowerCase().split(" ");

function poeta (length, r, curr, prev) {
  r= "";
  while (r.length < length) {
    do curr= words[rnd(words.length)]; while (curr === prev);
    r+= (prev= curr)+ " ";
  }
  return r;
}


var timer= (function () {
  var time;
  return function timer (p, msg) {
    switch (p) {
      case "start":
        return (time= +new Date());
      case "stop":
        return sys.puts((msg || "")+ (+new Date()- time)+ " ms");
    }
  }
})();

var str= poeta(65536*8);
var strObj= {s: str};

kLoops= 2e6;
var stack= [];

(10).times(function () {
  stack.length= 0;
  
  timer('start');
  (kLoops).times(function () { stack.push(str+Math.random()); });
  timer('stop', "inmutable strings: ");
  
  timer('start');
  (kLoops).times(function () { stack.push(strObj); });
  timer('stop', "object    strings: ");
  
});