//20100504 jorge@jorgechamorro.com
//Módulo para compilar y lanzar procesos escritos en otros lenguajes.

//Compila código escrito en [C, C++, Objective-C, Fortran, Ada o assembler] y lo pone al alcance del programa principal.
//A diferencia de ruby gem inline, el código compilado no corre inline en el mismo proceso que el resto del programa,
//si no que corre en un proceso separado, lo que es mucho más guay para multinúcleos, jejeje.
//En cuanto al protocolo de IPC, allá cada cual... :-) (el canal son las pipes habituales: stdin/stdout)

var procesos= require('child_process');
var fs= require("fs");
var sys= require("sys");

exports.compilar= function (codigo, lenguaje, callBack) {
  var base= "/tmp/tMpFiLe"+ (+new Date()+ ""+ Math.random()).replace(/\./g, "");
  var srcTmpFile= base+ lenguaje;
  var outTmpFile= base+ ".out";
  
  //guardar el codigo en srcTmpFile:
  fs.writeSync(fs.openSync(srcTmpFile, "w"), codigo, 0, 'utf8');
  
  sys.puts("COMPILANDO src"+ lenguaje+ " EN UN PROCESO SEPARADO...");
  procesos.exec("gcc -o "+ outTmpFile+ " "+ srcTmpFile, function (err, stdout, stderr) {
    //Si ha habido un error, simplemente volvemos:
    if (err) return callBack("Se ha producido un error al compilar:"+ err, null);
    
    //Todo ha ido bien:
    sys.puts("COMPILADO: OK.");
    //lanzar el proceso:
    var proceso= procesos.spawn(outTmpFile);
    
    //Añadimos al proceso unos cuantos métodos y atributos que nos convienen:
    
    //Una pila de inputs: [parametro, callback]
    proceso.inputs= [];
    
    //Un buffer
    proceso.buffer= "";
    
    //Una f() que almacena y procesa su stdout:
    proceso.stdout.addListener('data', function (data) {
      proceso.buffer+= data;
      var item, newLinePos;
      while ((newLinePos= proceso.buffer.indexOf("\n")) >= 0) {
        item= proceso.inputs.shift();
        if (item) {
          item.output= proceso.buffer.substring(0, newLinePos);
          item.timeOut= +new Date();
          item.callback(item);
        }
        proceso.buffer= proceso.buffer.substr(newLinePos+1);
      }
    });
    
    function pepito (param, cb) {
      //Esta es la función que comunica con el proceso:
      //Almacena esta llamada:
      proceso.inputs.push({ input: param, callback: cb, timeIn: +new Date() });
      //y le pasamos la chicha por stdin:
      proceso.stdin.write(param+ "\n", "utf8");
    }
    
    //Una referencia al proceso:
    pepito.proceso= proceso;
    
    //devolvemos el (no) error, y la función que comunica con el proceso:
    return callBack(err, pepito);
  });
}
