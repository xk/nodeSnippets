/*
Compara la velocidad de i++ vs la de ++i
*/


function testPre () {
  var i= 0;
  var n= kLoops; 
  var t= Date.now(); 
  while (n--) {
    ++i, ++i, ++i, ++i, ++i;
    ++i, ++i, ++i, ++i, ++i;
    ++i, ++i, ++i, ++i, ++i;
    ++i, ++i, ++i, ++i, ++i;
  }
  return [Date.now()- t, i];
}

function testPost () {
  var i= 0;
  var n= kLoops; 
  var t= Date.now();
  while (n--) {
    i++, i++, i++, i++, i++;
    i++, i++, i++, i++, i++;
    i++, i++, i++, i++, i++;
    i++, i++, i++, i++, i++;
  }
  return [Date.now()- t, i];
}

function display () {
  console.log([
  "i++: "+ (postAcumulador*1e6/ctr/kFactor/kLoops).toFixed(2)+ "ns",
  "++i: "+ (preAcumulador*1e6/ctr/kFactor/kLoops).toFixed(2)+ "ns",
  "COUNT: "+ (kLoops* kFactor* ctr / 1e6).toFixed(1)+ " Millions"
  ]);
}

var kFactor= 20;
var kLoops= 1e5;
var kTargetT= 500;

kLoops= Math.floor(kLoops* (kTargetT/ testPre()[0]));
kLoops= Math.floor(kLoops* (kTargetT/ testPre()[0]));
console.log("kLoops -> "+ kLoops);

var ctr= 0;
var preAcumulador= 0;
var postAcumulador= 0;


(function tester () {
  var pre, post;
  if (tester.flag= !tester.flag) {
    post= testPost();
    pre= testPre();
  } else {
    pre= testPre();
    post= testPost();
  }
  if (pre[1] !== post[1]) throw Error("FALLO");
  preAcumulador+= pre[0];
  postAcumulador+= post[0];
  ctr++;
  display();
  setTimeout(tester, 333);
})();