/*
2010-09-01 jorge@jorgechamorro.com
Compara la velocidad de las llamadas a una f y a esa misma f.bind({})
Node.js
*/

Function.prototype.fakeBind = function (o) {
  var fn = this
    , args = Array.prototype.slice.call(arguments, 1)
  return function () { return fn.apply(o, args.concat(Array.prototype.slice.call(arguments))) }
}

var acumulador= 0;
var kLoops= 3e3;
var kMul= 5;

function unbound (a) { return a }
var bound= unbound.bind({});
var wow= unbound.fakeBind({});
function tryIt (a) { try { return a; } catch (e) {} };
function tryItFinally (a) { try { return a; } catch (e) {} finally {} };

var tests;
(tests= [unbound, bound, wow, tryIt, tryItFinally]).forEach( function (v,i,o) { v.ctr= v.ms= 0 } );

function tester (f) {
  var n= kLoops;
  var t= Date.now();
  while (n--) f(0), f(0), f(0), f(0), f(0);
  f.ms+= (Date.now()- t);
  f.ctr+= kLoops* kMul;
}


setInterval(function displayResults () {
  var n= 0, txt= "\r",  calls= [],  tAcum= [];
  while (n < tests.length) {
   var f= tests[n], name= f.name;
   txt+= name+ ": "+ (f.ms*1e6/f.ctr).toFixed(2)+ " ns  ";
   calls[n]= f.ctr;
   tAcum[n]= f.ms;
   n++;
  }
  txt+= "calls: ["+ calls+ "]  t acumulado: ["+ tAcum+ "]  acumulador: "+ acumulador;
  console.log(txt);
}, 1e3);


(function f () {
  f.t= ((f.t || 0)+ 1)% tests.length;
  tester(tests[f.t]);
  process.nextTick(f);
})()