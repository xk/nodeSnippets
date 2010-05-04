//20100504 jorge@jorgechamorro.com
//Para chinchar a los locos del Ruby.
//Módulo inline para Node: permite compilar un .c y usarlo desde Node.
//tiene la ventaja adicional de que lo compilado corre en un proceso aparte :-)
//Lo que es cojonudo cuando tienes varios núcleos.
//Detección y corrección de errores... (eso qué es ?)

require("./inline").compilar('\
  #include <stdio.h>\n\
  int main (int argc, const char * argv[]) { \
    double val; \
    while (scanf("%lf", &val) != EOF) {\
      printf("%lf\\n", val+1);\
      fflush(stdout); \
    }\
  }\
', ".c", seHaAcabadoDeCompilar);

function seHaAcabadoDeCompilar (error, pepito) {
  var resultados= [];
  var n= (process.argv[2] && (+process.argv[2] > 0) && +process.argv[2]) || 9;
  function callBack (item) { resultados.push(item); }
  
  if (error) return sys.puts(error);
  
  //Llamarla en bucle para demostrar que funciona:
  while (n--) pepito(n, callBack);

  require("sys").puts("\nYa hemos hecho todas las llamadas a la función en un bucle.\nAhora mismo se están ejecutando en otro proceso.\nEstamos esperando los resultados...\n");

  (function monitor (item) {
    //Muestra resultados a medida que los haya
    while (resultados.length) {
      item= resultados.shift();
      require("sys").puts("f("+ item.input+ ")="+ (+item.output)+ ", ha tardado:"+ (item.timeOut-item.timeIn)+ "ms");
    }
    if (pepito.proceso.inputs.length || resultados.length) {
      setTimeout(monitor, 1);
    } else {
      pepito.proceso.kill();
    }
  })();
}