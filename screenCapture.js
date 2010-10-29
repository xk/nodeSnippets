#!/usr/bin/env node

/*
  20101026 jorge@jorgechamorro.com
  repeteadly captures the Mac screen via screencapture, and serves it as a stream of <img>s
*/

var spawn= require('child_process').spawn;
var exec= require('child_process').exec;
var fs= require('fs');
var MAX_INT= Math.pow(2,53);
var html= getNamedChunks(arguments.callee.toString()).srcHTML;
var kPeriodoDeCaducidad= 33;
var fifo1= "/var/tmp/___nOdEfIfO_"+ Date.now().toString(36)+ (MAX_INT * Math.random()).toString(36);
var fifo2= "/var/tmp/___nOdEfIfO_"+ Date.now().toString(36)+ (MAX_INT * Math.random()).toString(36);
exec('mkfifo '+ fifo1+ " "+ fifo2, function (error, stdout, stderr) {
  if (error) throw error;
});

var quitting;
var capturaEnCurso;
var ultimaCaptura;
var cbQueue= [];
var maxSize= 0;
var minSize= 1e9;

function capturarAhora () {
  if (quitting || capturaEnCurso) return;
  capturaEnCurso= true;
  
  var scrn= exec('screencapture -CSx -t jpg '+ fifo1, function dsp (e,o,i) {
    var imck= exec("convert -quality 20 jpg:"+ fifo1+ "'[80%]' jpg:"+ fifo2, function dsp (e,o,i) { });
    fs.readFile(fifo2, function (error, data) {
      if (error) throw error;
      if (capturarAhora.caducaTimer) clearTimeout(capturarAhora.caducaTimer);
      capturarAhora.caducaTimer= setTimeout(function () {
        capturaEnCurso= false;
        ultimaCaptura= null;
      }, kPeriodoDeCaducidad);
      ultimaCaptura= data;
      if (data.length > maxSize) console.log('MaxSize -> '+ (maxSize= data.length));
      if (data.length < minSize) console.log('MinSize -> '+ (minSize= data.length));
      cbQueue.forEach(function (cb) {
        cb(ultimaCaptura);
      });
      cbQueue= [];
    });
  });
}

function dameUnaCaptura (cb) {
  if (ultimaCaptura) return cb(ultimaCaptura);
  cbQueue.push(cb);
  capturarAhora();
}

require('http').createServer(function (req, res) {
  if (req.method !== 'GET') {
    res.writeHead(200, {'Content-Type' : 'txt/plain'});
    res.end('FAIL');
  }
  else if ((req.url.indexOf("screencapture") >= 0) || (req.url.indexOf("favicon") >= 0)) {
    res.writeHead(200, {'Content-Type' : 'image/jpeg', 'Cache-Control' : 'no-cache'});
    dameUnaCaptura(function (imagen) {
      res.end(imagen);
    });
  }
  else {
    res.writeHead(200, {'Content-Type': 'text/html', 'Cache-Control' : 'no-cache'});
    res.end(html, 'utf8');
  }
}).listen(12345);

console.log('Server running at http://127.0.0.1:12345/');
console.log(fifo1);
console.log(fifo2);

function exit () {
  if (capturaEnCurso) {
    quitting= true;
    setTimeout(exit, 10);
    return;
  }
  if (!exit.flag) {
    exit.flag= 1;
    exec('rm '+ fifo1, [], function (error, stdout, stderr) {
      exec('rm '+ fifo2, [], function (error, stdout, stderr) {
        console.log('\nBYE');
        process.exit(0);
      });
    });
  }
}

process.on('exit', exit);
process.on('SIGINT', exit);
process.on('uncaughtException', exit);

/* beginchunk: srcHTML
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN"
   "http://www.w3.org/TR/html4/strict.dtd">

<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <title>Node Remote Desktop</title>
  <meta name="generator" content="TextMate http://macromates.com/">
  <meta name="author" content="Jorge@jorgechamorro.com">
  <!-- Date: 2010-10-26 -->
  <style type="text/css">
    body { margin:0; padding:0; }
    #imgcontainer { padding:0; }
  </style>
  <script type="text/javascript">
    window.onload= function () {
      var MAX_INT= Math.pow(2,53);
      var img= document.getElementById('img');
      var t= +new Date();
      var kPeriodo= 33;
      img.onerror= reload;
      (img.onload= function () {
        var now= +new Date();
        var next= kPeriodo- (now- t);
        if (next < 0) next= 0;
        setTimeout(reload, next);
        t= now;
      })();
      
      function reload () {
        img.src="screencapture"+ "?t="+ (+new Date()).toString(36)+ (MAX_INT * Math.random()).toString(36);
      }
    };
  </script>
</head>
<body>
  <div id="imgcontainer">
    <img id="img">
  </div>
</body>
</html>
endchunk */

function getNamedChunks (txt) {
  var etiq;
  var chunks= {};
  txt= txt.split('\n');
  txt.forEach(function (v,i,o) {
    var r;
    if (etiq) {
      if ((/^endchunk[\s]{0,}\*\/$/i).test(v)) {
        chunks[etiq]= chunks[etiq].join('\n');
        etiq= '';
      }
      else chunks[etiq].push(v);
    }
    else if (r= v.match(/^\/\*[\s]{0,}beginchunk:[\s]{0,}([^\s]{1,})[\s]{0,}$/i)) {
      etiq= r[1];
      chunks[etiq]= [];
    }
  });
  return chunks;
}
