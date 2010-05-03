//20100401 jorge@jorgechamorro.com
//still attempting to gzip afap

var sys= require("sys");
var http= require("http");
var spawn = require("child_process").spawn;
var port= 12345;

function gzipStr (str, callback, child, stdout, stderr) {
  child= spawn("gzip", ["-c", "-f", "-n"]);
  stdout= stderr= "";

  child.stdout.addListener("data", function (chunk) {
    if (chunk) stdout+= chunk;
  });
  
  child.stderr.addListener("data", function (chunk) {
    if (chunk) stderr+= chunk;
  });

  child.addListener("exit", function (code) {
    //sys.puts("input: \""+ str+ "\"\n-->"+ hexdump(stdout));
    callback(code ? "" : stdout);
  });
  
  child.stdout.setEncoding('binary');
  child.stdin.write(str, "utf8");
  child.stdin.close();
};

http.createServer(function (request, response) {
  
  if (request.url.indexOf("favicon") >= 0) {
    response.writeHeader(404, {});
    response.write("");
    return response.close();
  }

  gzipStr(newLoremIpsum(8192), function (str) {
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

var words= "Lorem ipsum dolor sit amet consectetur adipiscing elit Suspendisse nunc ante ut tincidunt fringilla id risus pulvinar metus nec scelerisque pellentesque".toLowerCase().split(" ");
function newLoremIpsum (length, r, curr, prev) {
  r= "";
  while (r.length < length) {
    do {
      curr= words[rnd(words.length)];
    } while (curr === prev);
    r+= (prev= curr)+ " ";
  }
  return r;
}
