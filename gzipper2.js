//20100330 jorge@jorgechamorro.com
//gzipStr(str) returns str gzipped to cb(str)

var sys= require("sys");
var http= require("http");
var fs= require("fs");
var port= 12345;

function gzipStr (str, cb, key, file, cmd) {
  do {
    key= rndStr(16);
  } while (str.indexOf(key) >= 0);
  file= "/tmp/NodeGzipTmpFile_"+ key+ "_"+ (+new Date())+ ".gz";
  cmd= "gzip -n << "+ key+ " > "+ file +"\n"+ str+ "\n"+ key+ "\n";
  sys.exec(cmd, function (err, stdout, stderr) {
    if (err) return cb("");
    fs.readFile(file, "binary", function (err, data) {
      fs.unlink(file, function () {});
      return cb(err ? "" : data);
    });
  });
}


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






http.createServer(function (request, response) {
  
  if (request.url.indexOf("favicon") >= 0) {
    response.writeHeader(404, {});
    response.write("");
    return response.close();
  }

  var str= "this is a test";
  var now= +new Date();
  gzipStr(str, function (binaryString) {
    if (binaryString) {
      response.writeHeader(200, {
        "Content-Type": "text/plain; charset=UTF-8;",
        "server":"Node.js",
        "Content-Encoding":"gzip",
        "Connection":"close"
      });
      response.write(binaryString, "binary");
    }
    response.close();
    //sys.puts("before:"+ str.length+ ", after:"+ binaryString.length+ ", time:"+ (new Date()- now)+ "ms");
  });
}).listen(port);

sys.puts("Server running at http://localhost:"+ port+ "/");


