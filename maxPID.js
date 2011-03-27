//Crea infinidad de procesos en un bucle
//y los va cerrando una vez abiertos
//hasta averiguar cual es max PID


var n=0;
var max= 0;

function loop () {
  
  var nuProc= require('child_process').spawn('sh -s');
  nuProc.on('exit', next);
  var pid= nuProc.pid;
  console.log([++n, pid]);
  process.kill(pid);
  
  function next () {
    if (max < pid) {
      max= pid;
      process.nextTick(loop);
    }
    else {
      console.log("Max PID -> "+ max);
    }
  }
}


loop();
