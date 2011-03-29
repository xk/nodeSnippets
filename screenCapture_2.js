#!/usr/bin/env node

/*
  20110329 jorge@jorgechamorro.com
  repeteadly captures the Mac screen via screencapture, and serves it as a stream of <img>s
*/

var fs= require('fs');
var fileName= process.env.TMPDIR+ "_";
var spawn= require('child_process').spawn;
var html= getNamedChunks(arguments.callee.toString()).srcHTML;

main();

function main () {

  function conexion (req, res) {
    process.stdout.write('.');
    
    res.statusCode = 200;
    res.setHeader("Cache-Control", "no-cache");
    
    if (req.method !== 'GET') {
      res.setHeader("Content-Type", "txt/plain");
      res.end('INVALID REQUEST');
    }
    else if ((req.url.indexOf("screencapture") >= 0) || (req.url.indexOf("favicon") >= 0)) {
      res.setHeader("Content-Type", "image/jpeg");
      res.setHeader("Cache-Control", "no-cache");
      var proc= spawn('screencapture', ['-Cx', '-t', 'jpg', fileName]);
      proc.on('exit', function () {
        var stream= fs.createReadStream(fileName, {bufferSize: 4* 1024* 1024});
        stream.pipe(res);
      });
    }
    else {
      res.setHeader("Content-Type", "text/html");
      res.end(html, 'utf8');
    }
  }
  
  require('http').createServer(conexion).listen(12345);
  console.log('Server running at http://127.0.0.1:12345/');
}


// ************************ CHUNKS

/*beginchunk: srcHTML
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
      
      (img.onload= function onload () {
        setTimeout(reload, 500);
      })();
      
      img.onerror= function onerror () {
        setTimeout(reload, 999);
      };
      
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

endchunk*/

// ************************ UTILITIES

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
