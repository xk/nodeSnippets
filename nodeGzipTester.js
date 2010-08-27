/*
2010-08-27 jorge@jorgechamorro.com
Node.js:
Program to monitor the behaviour of a gzip child process when its input is fed via stdin in small chunks, vs in a single piece.

See: http://groups.google.com/group/nodejs/browse_thread/thread/b9ba7dd6d0b39bb9#421164b67ed93e59
*/

function rnd (n) { return Math.floor(n* Math.random()) }

var poema= (function () {
  //"escribe" un "poema" de aproximadamente length caracteres.
  
  var words= "Con diez cañones por banda viento en popa a toda vela no corta el mar sino vuela un velero bergantín Bajel pirata que llaman por su bravura El Temido en todo mar conocido del uno al otro confín La luna en el mar riela en la lona gime el viento y alza en blando movimiento olas de plata y azul y va el capitán pirata cantando alegre en la popa Asia a un lado al otro Europa y allá a su frente Estambul Navega velero mío sin temor que ni enemigo navío ni tormenta ni bonanza tu rumbo a torcer alcanza ni a sujetar tu valor Veinte presas hemos hecho a despecho del inglés y han rendido sus pendones cien naciones a mis pies Que es mi barco mi tesoro que es mi dios la libertad mi ley la fuerza y el viento mi única patria la mar Allá muevan feroz guerra ciegos reyes por un palmo más de tierra que yo aquí tengo por mío cuanto abarca el mar bravío a quien nadie impuso leyes Y no hay playa sea cualquiera ni bandera de esplendor que no sienta mi derecho y dé pechos mi valor Que es mi barco mi tesoro que es mi dios la libertad mi ley la fuerza y el viento mi única patria la mar A la voz de barco viene es de ver cómo vira y se previene a todo trapo a escapar que yo soy el rey del mar y mi furia es de temer En las presas yo divido lo cogido por igual sólo quiero por riqueza la belleza sin rival Que es mi barco mi tesoro que es mi dios la libertad mi ley la fuerza y el viento mi única patria la mar Sentenciado estoy a muerte Yo me río no me abandone la suerte y al mismo que me condena colgaré de alguna antena quizá en su propio navío Y si caigo qué es la vida Por perdida ya la di cuando el yugo del esclavo como un bravo sacudí Que es mi barco mi tesoro que es mi dios la libertad mi ley la fuerza y el viento mi única patria la mar Son mi música mejor aquilones el estrépito y temblor de los cables sacudidos del negro mar los bramidos y el rugir de mis cañones Y del trueno al son violento y del viento al rebramar yo me duermo sosegado arrullado por el mar Que es mi barco mi tesoro que es mi dios la libertad mi ley la fuerza y el viento mi única patria la mar".toLowerCase().split(" ").filter((function (found) {
    return function (v, i, o) {
      if (found.indexOf(v) >= 0) return;
      else return found.push(v);
    };
  })([]));

  return function poema (length, r, curr, prev) {
    r= words[rnd(words.length)];
    while (r.length < length) {
      do curr= words[rnd(words.length)]; while (curr === prev);
      r+= " "+ (prev= curr);
    }
    return r;
  };
})();

function newGzipper () {
  //Launches and returns a new gzip child process.
  return require('child_process').spawn("gzip",["--stdout","--best"]);
}

/*
Init the input text to be fed to gzip
*/


var chunks= (function (c, txt) {
  while ((txt+= (c[c.length]= poema(rnd(1024))+ " ")).length < 512*1024 ) ;
  return c;
})([], "");

console.log("\"I\" === input chunks, \"O\" === output chunks.");

/*
Gzip it in small chunks fed to single gzip process
*/

inChunksGOOD= {
  gzip: newGzipper(),
  outputLen: 0,
  trace: "",
  chunkIndex: 0
};

inChunksGOOD.gzip.stdout.on('data', function (data) {
  inChunksGOOD.outputLen+= data.length;
  inChunksGOOD.trace+= "O";
});

inChunksGOOD.gzip.stdout.on('end', function () {
  console.log("\nWELL CHUNKED:\nTRACE: "+ inChunksGOOD.trace+ "*END*\nOUTPUT: "+ inChunksGOOD.outputLen+ " bytes");
});
  
(function chunker () {
  //feeds the chunks.
  if (inChunksGOOD.chunkIndex < chunks.length) {
    inChunksGOOD.gzip.stdin.write(chunks[inChunksGOOD.chunkIndex++], encoding='utf8');
    setTimeout(chunker, 1e3/60);
  } else {
    inChunksGOOD.gzip.stdin.end(chunks[inChunksGOOD.chunkIndex++], encoding='utf8');
  }
  inChunksGOOD.trace+= "I";
})();


/*
Gzip it in small chunks fed to -many- gzip processes. (BAD, BAD, very bad).
*/

inChunksBAD= {
  gzip: null,
  outputLen: 0,
  trace: "",
  chunkIndex: 0
};

(function chunker () {
  //feeds the chunks to the gzippers at a rate as fast as possible.
  inChunksBAD.gzip= newGzipper();
  
  inChunksBAD.gzip.stdout.on('data', function (data) {
    inChunksBAD.outputLen+= data.length;
    inChunksBAD.trace+= "O";
  });

  inChunksBAD.gzip.stdout.on('end', function () {
    if (inChunksBAD.chunkIndex < chunks.length) return setTimeout(chunker, 5);
    console.log("\nBADLY CHUNKED:\nTRACE: "+ inChunksBAD.trace+ "*END*\nOUTPUT: "+ inChunksBAD.outputLen+ " bytes");
  });
  
  inChunksBAD.gzip.stdin.end(chunks[inChunksBAD.chunkIndex++], encoding='utf8');
  inChunksBAD.trace+= "I";
})();


/*
And gzip it too in a single piece and with a single gzip process.
*/

inASinglePiece= {
  gzip: newGzipper(),
  outputLen: 0,
  trace: "I"
};

inASinglePiece.gzip.stdout.on('data', function (data) {
  inASinglePiece.outputLen+= data.length;
  inASinglePiece.trace+= "O";
});
  
inASinglePiece.gzip.stdout.on('end', function (data) {
  console.log("\ninASinglePiece:\nTRACE: "+ inASinglePiece.trace+ "*END*\nOUTPUT: "+ inASinglePiece.outputLen+ " bytes");
});
  
inASinglePiece.gzip.stdin.end(chunks.join(""), encoding='utf8');

