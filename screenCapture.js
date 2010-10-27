#!/usr/bin/env node

/*
  20101026 jorge@jorgechamorro.com
  repeteadly captures the Mac screen via screencapture, and serves it as a stream of <img>s
*/

var exec= require('child_process').exec;
var fs= require('fs');
var MAX_INT= Math.pow(2,53);
var html= process.mainModule.chunks.srcHTML;
var kPeriodoDeCaducidad= 222;
var fifo= process.ENV.TMPDIR+ "_____nOdEfIfO_"+ Date.now().toString(36)+ (MAX_INT * Math.random()).toString(36);
exec('mkfifo '+ fifo, [], function (error, stdout, stderr) {
  if (error) throw error;
});

var capturaEnCurso;
var ultimaCaptura;
var cbQueue= [];

function capturarAhora () {
  if (capturaEnCurso) return;
  capturaEnCurso= true;
  exec('screencapture -CSx -t jpeg '+ fifo, [], function (error, stdout, stderr) {
    if (error) throw error;
    fs.readFile(fifo, function (error, data) {
      if (error) throw error;
      ultimaCaptura= data;
      cbQueue.forEach(function (cb) {
        cb(ultimaCaptura);
      });
      cbQueue= [];
      if (capturarAhora.caducaTimer) clearTimeout(capturarAhora.caducaTimer);
      capturarAhora.caducaTimer= setTimeout(function () {
        capturaEnCurso= false;
        ultimaCaptura= null;
      }, kPeriodoDeCaducidad);
    });
  });
}

function dameUnaCaptura (cb) {
  if (ultimaCaptura) cb(ultimaCaptura);
  else cbQueue.push(cb);
  capturarAhora();
}

require('http').createServer(function (req, res) {
  if (req.method !== 'GET') {
    res.writeHead(200, {'Content-Type' : 'txt/plain'});
    res.end('FAIL');
  }
  else if ((req.url.indexOf("screencapture") >= 0) || (req.url.indexOf("favicon") >= 0)) {
    //console.log("image/jpeg");
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
console.log(fifo);

function exit () {
  if (!exit.flag) {
    exit.flag= 1;
    exec('rm '+ fifo, [], function (error, stdout, stderr) {
      console.log('\nBYE');
      process.exit(0);
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
  #control { position:fixed; top:0; left:0; right:0; background-color:rgba(0,1,0,0.5); padding-left:12px; padding-right:12px; }
  #imgcontainer { padding:0;  padding-top: 21px; }
  #slider { width:100%; }
  img { width:100%; }
  </style>
  <script type="text/javascript">
  window.onload= function () {
    var MAX_INT= Math.pow(2,53);
    var img= document.getElementById('img');
    var kPeriodo= 500;
    var buffer= [];
    var t= +new Date();
    img.onload= onLoad;
    img.src="screencapture"+ noCache();
    var kMaxBufferLength= 999;
    var slider= document.getElementById('slider');
    slider.onchange= onChange;
    slider.max= kMaxBufferLength;
    slider.value= kMaxBufferLength;
    
    function noCache () {
      return "?t="+ (+new Date()).toString(36)+ (MAX_INT * Math.random()).toString(36);
    }

    function onChange () {
      var current= document.getElementById('img');
      var item= Math.floor(slider.value* (buffer.length- 1)/ slider.max);
      current.parentNode.replaceChild(buffer[item], current);
    }

    function onLoad () {
      var elapsedTime= +new Date()- t;
      if (elapsedTime < kPeriodo) return setTimeout(onLoad, kPeriodo- onLoad+ 1);
      
      if (buffer.push(img) > kMaxBufferLength) {
        buffer= buffer.slice(-kMaxBufferLength);
      }
      
      if (slider.value === slider.max) {
        var current= document.getElementById('img');
        current.parentNode.replaceChild(img, current);
      }
      
      setTimeout(function () {
        img= document.createElement('img');
        img.id= 'img';
        img.onload= onLoad;
        img.onerror= function () {
          img.src="screencapture"+ noCache();
        };
        img.src="screencapture"+ noCache();
        t= +new Date();
      }, 10);
    }
  };
  </script>
</head>
<body>
  <div id="control">
    <input id="slider" type="range" min="0" max="1" value="1">
  </div>
  <div id="imgcontainer">
    <img id="img">
  </div>
</body>
</html>
endchunk */