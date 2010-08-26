/*

Node.js:
Program to monitors the behaviour of a gzip child process when its input is fed via stdin in small chunks, vs in a single piece.

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

var inputTxt= poema(512*1024) /* 512 kilobytes */, verifyInputTxt= "";

/*
Gzip it in small chunks
*/

inChunks= {
  gzip: newGzipper(),
  outputLen: 0,
  trace: "",
  cursor: 0
};

inChunks.gzip.stdout.on('data', function (data) {
  inChunks.outputLen+= data.length;
  inChunks.trace+= "O";
});

inChunks.gzip.stdout.on('end', function (data) {
  console.log("\nCHUNKED:\nTRACE: "+ inChunks.trace+ "*END*\nOUTPUT: "+ inChunks.outputLen+ " bytes");
  console.log("verifyInputTxt === inputTxt --> "+ (verifyInputTxt === inputTxt))
});
  
(function chunker () {
  //feeds inputTxt to the gzipper in chunks of no more than 1k at a rate of about 50 chunks per second
  var chunk= inputTxt.substr(inChunks.cursor, 1+ rnd(1024));
  verifyInputTxt+= chunk;
  inChunks.cursor+= chunk.length;
  if (inChunks.cursor < inputTxt.length) { 
    inChunks.gzip.stdin.write(chunk, encoding='utf8');
    setTimeout(chunker, 1e3/70); //70 chunks per second
  } else {
    inChunks.gzip.stdin.end(chunk, encoding='utf8');
  }
  inChunks.trace+= "I";
})();


/*
And gzip it too in a single piece.
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
  
inASinglePiece.gzip.stdin.end(inputTxt, encoding='utf8');

console.log("\"I\" === input chunks, \"O\" === output chunks.");
