var max= 1e4;
function un_bound () {}
var bound= un_bound.bind({});

function a () {
  var t= Date.now();
  var n= 1e4;
  while (n--) un_bound();
  a.ms+= (Date.now()- t);
  a.ctr++;
}

function b () {
  var t= Date.now();
  var n= 1e4;
  while (n--) bound();
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