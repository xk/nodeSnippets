/*
2010-09-01 jorge@jorgechamorro.com
Compara la velocidad de la cola de nextTick con sólo 1 item y con muchos items
Node.js
*/

var kTestDuration= 1e3; //ms
var RUN= 0;
var CTR= 0;

function pad (string, len) {
  string+= "";
  while (string.length < len) {
    string= " "+ string;
  }
  return string;
}

function queueItem () {
  if (RUN) CTR++, process.nextTick(queueItem);
}

function installItems (n) {
  while (n--) process.nextTick(queueItem);
}

function test (howManyItems, cb) {
  RUN= 1;
  CTR= 0;
  installItems(howManyItems);
  var t= Date.now();
  setTimeout(function () {
    RUN= 0;
    t= Date.now()- t;
    process.nextTick(display);
  }, kTestDuration);
  
  function display () {
    var txt= "CALLS:"+ pad(CTR, 9)+ "  t: "+ t+ "  f:"+ pad((CTR/t/1e3).toFixed(4), 7)+ " MHz  T: "+ pad((1e6*t/CTR).toFixed(2), 7)+ "ns  ITEMS:"+ pad(howManyItems, 5);
    console.log(txt);
    process.nextTick(cb);
  }
}

var params= [1, 5, 10, 20, 40, 60, 80, 100, 500, 1000, 5000, 9999];

(function next (param) {
  if (params.length) {
    test(params.shift(), next);
  }
})();
