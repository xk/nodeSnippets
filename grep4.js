//#/usr/bin/env node
//hace un grep de stdin hasta EOF
//uso: node grep.js fileName 'regExp'

var sys= require("sys");
var fs= require('fs');
var fd= fs.openSync(process.argv[2], "r");
var pos= 0;
var buffer= [];
var veces= 0;
var ctr= 0;

(function loop () {
  fs.read(fd, 2*65536, pos, "utf8", function (err, data, bytesRead) {
    if (!bytesRead) {
      procesarBuffer();
      ctr+= ER.test(buffer);
      process.stdout.write([ctr, veces, pos]+ "\n");
      return;
    }
    //sys.puts([ctr, veces++, pos]);
    veces++;
    pos+= bytesRead;
    //buffer.push(data);
    //process.nextTick(loop);
    loop();
    //process.nextTick(procesarBuffer);
  });
})();

var ER= new RegExp(process.argv[3], "g");                 //La RegExp que nos han pasado
function procesarBuffer (newLinePos) {                    //Esto se ejecuta mientras estamos esperando a que lleguen más datos
  while ((newLinePos= buffer.indexOf("\n")) >= 0) {       //Vamos cortando por los saltos de línea: esto es una especie de readLine()
    ctr+= ER.test(buffer.substr(0, newLinePos));
    buffer= buffer.substr(newLinePos+1);
  }
}