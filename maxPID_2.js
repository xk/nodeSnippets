//Crea infinidad de procesos en un bucle
//para averiguar cual es el máximo de procesos
//que se puede lanzar.


var n=0;
var procs= [];

function loop () {
  
  try {
    var nuProc= require('child_process').spawn('sh', [ '-s' ]);
    procs.push(nuProc);
    console.log([++n, nuProc.pid]);
    next();
  }
  catch (e) {
    console.log(e);
    console.log("\nCtrl-C para salir");
  }
  
  function next () {
    process.nextTick(loop);
  }
}


loop();
