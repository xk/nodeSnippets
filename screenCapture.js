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
var fifo1= process.ENV.TMPDIR+ "___nOdEfIfO_"+ Date.now().toString(36)+ (MAX_INT * Math.random()).toString(36);
var fifo2= process.ENV.TMPDIR+ "___nOdEfIfO_"+ Date.now().toString(36)+ (MAX_INT * Math.random()).toString(36);
exec('mkfifo '+ fifo1+ " "+ fifo2, function (e, o, i) {
  if (e) throw e;
  main();
});

function main () {
  var capturando;
  var captura;
  var cbQueue= [];
  var maxSize= 0;
  var minSize= 1e9;

  function capturarAhora () {
    if (capturando) return;
    capturando= true;
    exec('screencapture -CSx -t jpg '+ fifo1, function (e,o,i) {
      if (e) throw e;
      exec("convert -quality 70 jpeg:"+ fifo1+ "'[55%]' jpeg:"+ fifo2, function (e,o,i) { if (e) throw e });
      fs.readFile(fifo2, function (e, data) {
        if (e) throw e;
        capturando= false;
        captura= data;
        cbQueue.forEach(function (cb) { cb(captura) });
        cbQueue= [];
        setTimeout(function () { captura= null }, kPeriodoDeCaducidad);
        if ((data.length > maxSize) || (data.length < minSize)) {
          if (data.length > maxSize) maxSize= data.length;
          if (data.length < minSize) minSize= data.length;
          console.log([minSize, maxSize]);
        }
      });
    });
  }

  function dameUnaCaptura (cb) {
    if (captura) return cb(captura);
    cbQueue.push(cb);
    capturarAhora();
  }
  
  function conexion (req, res) {
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
      console.log(req);
    }
  }
  
  require('http').createServer(conexion).listen(8080);
  console.log('Server running at http://127.0.0.1:8080/');
  console.log(fifo1);
  console.log(fifo2);

  function exit () {
    exec('rm '+ fifo1+ " "+ fifo2, function (e,o,i) {});
    console.log('\nBYE');
  }

  process.on('SIGINT', exit);
}


/* beginchunk: srcHTML
<!DOCTYPE html>

<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <title>Node Remote Desktop</title>
  <meta name="generator" content="TextMate http://macromates.com/">
  <meta name="author" content="Jorge@jorgechamorro.com">
  <!-- Date: 2010-10-26 -->
  <style type="text/css">
    body { margin:0; padding:0; }
  </style>
  <script type="text/javascript">
    window.onload= function () {
      var MAX_INT= Math.pow(2,53);
      var img= document.getElementById('img');
      var t= +new Date();
      var kPeriodo= 33;
      img.onload= function () {
        var now= +new Date();
        var next= kPeriodo- (now- t);
        if (next < 0) next= 0;
        setTimeout(reload, next);
        t= now;
      };
      (img.onerror= reload)();
      
      function reload () {
        img.src="screencapture"+ "?t="+ (+new Date()).toString(36)+ (MAX_INT * Math.random()).toString(36);
      }
    };
  </script>
</head>
<body>
  <img id="img">
</body>
</html>
endchunk */

function getNamedChunks (txt) {
  var etiq;
  var chunks= {};
  txt= txt.split('\n');
  var endRE= /^endchunk[\s]{0,}\*\/$/i;
  var beginRE= /^\/\*[\s]{0,}beginchunk:[\s]{0,}([^\s]{1,})[\s]{0,}$/i;
  txt.forEach(function (v,i,o) {
    var r;
    if (etiq) {
      if (endRE.test(v)) {
        chunks[etiq]= chunks[etiq].join('\n');
        etiq= '';
      }
      else chunks[etiq].push(v);
    }
    else if (r= v.match(beginRE)) {
      etiq= r[1];
      chunks[etiq]= [];
    }
  });
  return chunks;
}
