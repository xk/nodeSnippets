//#/usr/bin/env node
//hace un grep de stdin hasta EOF
//uso: cat file | node grep.js 'regExp'

var sys= require("sys");
var stdin= process.openStdin();                           //Abrimos stdin que es por donde nos llegan los datos

var ctr= 0;
var len= 0;
stdin.addListener('data', function (chunk) {              //los datos van llegando por aquí
  ctr++;
  len+= chunk.length;
});

stdin.addListener('end', function () {                    //sacabó
  sys.puts([ctr, len, (len/ctr).toFixed(1)]);                                          //Imprime el resultado
});
