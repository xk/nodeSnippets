max= 1e4;
function cb () {}
var q= [];

function a () {
  t= Date.now();
  n= 0;
  while (n < max) q[n++]= {f:cb};
  a.ms+= (Date.now()- t);
  a.ctr++;
}

function b () {
  t= Date.now();
  n= 0;
  while (n < max) q[n++]= [cb];
  b.ms+= (Date.now()- t);
  b.ctr++;
}

a.ctr= a.ms= 0;
b.ctr= b.ms= 0;

var tests= [a,b];

setInterval(function () {
  var n= 0, txt= "\r", loops= [], tAcum= [];
  while (n < tests.length) {
   var f= tests[n], name= f.name;
   txt+= name+ ".ms: "+ (f.ms/f.ctr).toFixed(2)+ " ms, ";
   loops[n]= f.ctr;
   tAcum[n]= f.ms;
   n++;
  }
  txt+= "loops: ["+ loops+ "], t acumulado: "+ tAcum;
  console.log(txt);
}, 1e3);


(function f () {
  f.t= ((f.t || 0)+ 1)% tests.length;
  tests[f.t]();
  process.nextTick(f);
})()