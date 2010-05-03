var sys= require("sys");
var http= require("http");
var port= 12345;

function hex (byte) {
  var d= byte.toString(16);
  d= (d.length < 2) ? "0"+d : d;
  return d+ ".";
}

function gzipStr (str, cb) {
  var key= rndStr(16)+ "\n";
  var cmd= "gzip -c -f << "+ key+ str+ "\n"+ key;
  sys.exec(cmd, "binary", function (err, stdout, stderr) {
    sys.puts("str: "+str+"\nerr: "+err+"\nstdout: "+stdout+"\nstderr: "+stderr);
    var i= 0;
    var txt= "";
    while (i < stdout.length) {
      var c= stdout[i];
      var n= c.charCodeAt(0);
      if (n > 255) {
        txt+= String.fromCharCode(n >>> 8) + String.fromCharCode(n & 255);
        sys.print("("+hex(n >>> 8)+ hex(n & 255)+")");
      } else {
        txt+= c;
        sys.print(hex(n));
      }
      i++;
    }
    stdout= "";
    cb(err ? "" : txt);
  });
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

http.createServer(function (request, response) {
  
  if (request.url.indexOf("favicon") >= 0) {
    response.writeHeader(404, {});
    response.write("");
    return response.close();
  }

  gzipStr("this is a test", function (str) {
    response.writeHeader(200, {
      "Content-Type": "text/plain",
      "server":"Node.js",
      "Content-Encoding":"gzip",
      "Connection":"close",
      "Content-Length":str.length
    });
    response.write(str, "binary");
    response.close();
  });

}).listen(port);

sys.puts("Server running at http://localhost:"+ port+ "/");
