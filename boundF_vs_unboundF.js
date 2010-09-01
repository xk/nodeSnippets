/*
2010-09-01 jorge@jorgechamorro.com
Compara la velocidad de las llamadas a una f y a esa misma f.bind({})
Node.js
*/

var kMax= 2e3;

function un_bound (a) { return a+ Math.random() }
var bound= un_bound.bind({});

var acumulador= 0;

function u () {
var n= kMax;
  var t= Date.now();
  while (n--) acumulador+= un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0)+ un_bound(0);
  u.ms+= (Date.now()- t);
  u.ctr++;
}

function b () {
var n= kMax;
  var t= Date.now();
  while (n--) acumulador+= bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0)+ bound(0);
  b.ms+= (Date.now()- t);
  b.ctr++;
}

var tests= [u,b];

tests.forEach(function (v,i,o) { v.ctr= v.ms= 0 });

setInterval(function () {
  var n= 0, txt= "\r",  loops= [],  tAcum= [];
  while (n < tests.length) {
   var f= tests[n], name= f.name;
   txt+= name+ ": "+ (f.ms/f.ctr).toFixed(2)+ " ms  ";
   loops[n]= f.ctr;
   tAcum[n]= f.ms;
   n++;
  }
  txt+= "loops: ["+ loops+ "]  t acumulado: ["+ tAcum+ "]  acumulador: "+ acumulador;
  console.log(txt);
}, 1e3);


(function f () {
  f.t= ((f.t || 0)+ 1)% tests.length;
  tests[f.t]();
  process.nextTick(f);
})()