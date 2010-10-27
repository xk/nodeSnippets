/*
  Speed Tester
  Uso:
  tester(functionToTest)
  tester.stop() or tester() stops tester
*/

var tester= (function () {
  var acumulador= 0;
  var kTargetT;
  var fooLoops, fooTime= 0;
  var ctr= 0;
  
  function foo () {}
  
  function display (t) {
    var a, b;
    var t= ((t[0]/ t[1])- fooTime);
    if  (t<0) t= 0;
    
    if (t >= 1e3) {
      a= (t/1e3).toFixed(2);
      b= "s";
    } else if (t >= 1) {
      a= (t).toFixed(2);
      b= "ms";
    } else if (t >= 1e-3) {
      a= (t*1e3).toFixed(2);
      b= "µs";
    } else {
      a= (t*1e6).toFixed(1);
      b= "ns";
    }
    
    return [t, a, b];
  }

  function tester (f, ms) {
    kTargetT= ms ? Math.floor(Math.abs(ms)) : 99;
    if (!f || typeof f !== "function") return;
      
    var t;
    if (!fooTime) {
      t= tester.calibrar();
      fooTime= 0;
      console.log("FooTime -> "+ display(t));
      fooTime= t[0]/t[1];
    }
    console.log( display(calibrar(f)) );
  }
  
  tester.calibrar= function () {
    var t= calibrar(foo, 33);
    fooTime= t[0]/t[1];
    return t;
  }
  
  function time (f, loops) {
    var n= loops, t= +new Date();
    while (n--) f();
    return [+new Date()- t, loops];
  }
  
  function calibrar (f, ms) {
    ms= ms || kTargetT;
    var k, t, loops= 1;
    while ((t= time(f, loops))[0] < ms) {
      if ((k= ms/(t[0]+1)) < 1) break;
      loops= Math.floor(1.1* loops* k);
      //console.log([loops, t[0]]);
    }
    //loops= Math.floor(loops* (ms/ t[0]));
    if (loops < 1) loops= 1;
    //console.log([t[0], t[1]]);
    return t;
  }
  
  return tester;
})();

var i= 0;
function a () { ++i; ++i; ++i; ++i; ++i; ++i; ++i; ++i; ++i; ++i; i= 0;
  var n= 1e6;
  while (n--) ;
  }
function b () { ++i; i= 0; }

process.nextTick(function f () {
  tester(a);
  //tester(b);
  process.nextTick(f);
});
