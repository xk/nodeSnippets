//#/usr/bin/env node
//hace un grep de stdin hasta EOF
//uso: cat file | node grep.js 'regExp'

var sys= require("sys");
var stdin= process.openStdin();                           //Abrimos stdin que es por donde nos llegan los datos
stdin.setEncoding('utf8');                                //esperemos que en utf-8

var buffer= "";
stdin.addListener('data', function (chunk) {              //los datos van llegando por aquí
  buffer+= chunk;                                         //Se almacenan en el buffer de entrada
  process.nextTick(procesarBuffer);                       //Y se procesan "en los ratos libres"
});

stdin.addListener('end', function () {                    //sacabó
  procesarBuffer();                                       //procesa la última línea
  ctr+= ER.test(buffer);                                  //Y lo que quiera que quede en el buffer (por si no acaba en /n)
  sys.puts(ctr);                                          //Imprime el resultado
});

var ER= new RegExp(process.argv[2], "g");                 //La RegExp que nos han pasado
var ctr= 0;
function procesarBuffer (newLinePos) {                    //Esto se ejecuta mientras estamos esperando a que lleguen más datos
  while ((newLinePos= buffer.indexOf("\n")) >= 0) {       //Vamos cortando por los saltos de línea: esto es una especie de readLine()
    ctr+= ER.test(buffer.substr(0, newLinePos));
    buffer= buffer.substr(newLinePos+1);
  }
}