#!/usr/bin/env node
//20100330 jorge@jorgechamorro.com
//gzipStr(str) returns str gzipped to cb(str)

var sys= require("sys");
var http= require("http");
var fs= require("fs");
var port= 12345;


function gzipStr (str, callback, child, stdout, stderr, file) {
  file= "/tmp/NodeGzipTmpFile_"+ rndStr(8)+ "_"+ (+new Date())+ ".gz";
  child= process.createChildProcess("gzip", ["-n", "-f", ">", file]);
  stdout= stderr= "";

  child.addListener("output", function (chunk) {
    if (chunk) stdout+= chunk;
  });

  child.addListener("error", function (chunk) {
    if (chunk) stderr+= chunk;
  });

  child.addListener("exit", function (code) {
    fs.readFile(file, "binary", function (err, data) {
      fs.unlink(file);
      sys.puts("input: \""+ str+ "\"\n-->"+ hexdump(data));
      return callback(err ? "" : data);
    });
  });

  child.write(str, "utf8");
  child.close();
};



//***** utility f()s

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


http.createServer(function (request, response) {
  
  if (request.url.indexOf("favicon") >= 0) {
    response.writeHeader(404, {});
    response.write("");
    return response.close();
  }

  var now= +new Date();
  gzipStr("this is a test", function (str) {
    if (str) {
      response.writeHeader(200, {
        "Content-Type": "text/plain; charset=UTF-8;",
        "server":"Node.js",
        "Content-Encoding":"gzip",
        "Connection":"close"
      });
      response.write(str, "binary");
    }
    response.close();
    //sys.puts("before:"+ str.length+ ", after:"+ binaryString.length+ ", time:"+ (new Date()- now)+ "ms");
  });
}).listen(port);

sys.puts("Server running at http://localhost:"+ port+ "/");


