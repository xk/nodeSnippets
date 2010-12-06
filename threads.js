//* ************************************** ALT-console

delete global.console;
console= {};
console.log= console.err= (function () {
  var fs= require('fs');
  var stdoutFD= 1;
  var writeQueue= [];
  console.isWritingNow= 0;
  var curBuf;
  var ctr= 0;
  
  function write (buffer) {
    console.isWritingNow= 1;
    curBuf= buffer;
    fs.write(stdoutFD, buffer, 0, buffer.length, -1, writeCB);
  }

  function newBuffer (txt) {
    var buf= new Buffer(txt);
    buf._sent= 0;
    return buf;
  }

  function writeCB (err, written) {
    if (err) {
      if (err.message.indexOf('EAGAIN') >= 0) written= 0;
      else throw err;
    }
    
    if ((curBuf._sent+= written) < curBuf.length) {
      var off= curBuf._sent;
      var len= curBuf.length- off;
      fs.write(stdoutFD, curBuf, off, len, -1, writeCB);
    }
    else if (writeQueue.length) {
      //write(newBuffer("*************************************** ["+ ['Buffer#', ctr++, ', #items: ', writeQueue.length].join('')+ "]\n"+ writeQueue.join('')));
      write(newBuffer(writeQueue.join('')));
      writeQueue.length= 0;
    }
    else {
      console.isWritingNow= 0;
      curBuf= null;
    }
  }
  
  function writer (txt) {
    if (console.isWritingNow) writeQueue.push(txt+ " *\n");
    else write(newBuffer(txt+ "\n"));
  }

  return writer;
})();

//*********************************************/

var QUIT= 0, i= 0, t0= Date.now()-1;
function next (ƒ) { process.nextTick(ƒ) }

function dspSpeed () {
  return (i/(Date.now()-t0)).toFixed(1)+ " Khz";
}

(function fiber (n) {
  (function loop () {
    if (QUIT) return;
    console.log([n, ' -> ', i++, " -> ", dspSpeed()].join(''));
    next(loop);
  })();
})(1);

process.on('SIGINT', quit);

function quit () {
  QUIT= 1;
  console.log("******** BYE *******");
  (function loop () {
    if (console.isWritingNow) return setTimeout(loop, 99);
    process.exit();
  })();
}
