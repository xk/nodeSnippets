//20100409 jorge@jorgechamorro.com
//For NodeJS > v 0.1.33 (NOT 0.1.33)

var sys= require("sys");
var http= require("http");
var port= 12345;
var gzipStr= require("./miModulo").gzipStr;


http.createServer(function (request, response) {
  //sys.puts(request.url);
  
  if (request.url.indexOf("favicon") >= 0) {
    response.writeHeader(200, {});
    response.write("");
    return response.end();
  }

  gzipStr(poema(4096), function (str) {
    response.writeHeader(200, {
      "Content-Type": "text/plain; charset=utf-8;",
      "server":"Node.js",
      "Content-Encoding":"gzip",
      "Connection":"close",
      "Content-Length":str.length
    });
    response.write(str, "binary");
    response.end();
  });

}).listen(port);

sys.puts("Server running at http://localhost:"+ port+ "/");

// ************  Utilities 

function hexdump (input, r, i) {
  r= "";
  if (typeof input === "string") {
    i= 0;
    while (i < input.length) {
      r+= hexdump(input.charCodeAt(i++));
    }
  } else if (typeof input === "number") {
    i= input.toString(16);
    i= (i.length < 2) ? "0"+i : i;
    r= i+ ".";
  }
  return r;
}

function rndStr (len) {
  var s= "abcdefghijklmnopqrstuvwxyz1234567890";
  var l= s.length;
  var r= "";
  while (r.length < len) {
    r+= s[rnd(l)];
  }
  return r;
} 

function rnd (n) {
  return (n* Math.random()) >>> 0;
}

var palabros= "Con diez cañones por banda viento en popa a toda vela no corta el mar si no vuela un velero bergantín bajel pirata que llaman por su bravura el temido en todo el mar conocido del uno al otro confín".toLowerCase().split(" ");
function poema (length, r, curr, prev) {
  r= "";
  while (r.length < length) {
    do {
      curr= palabros[rnd(palabros.length)];
    } while (curr === prev);
    r+= (prev= curr)+ " ";
  }
  return r;
}
