// 2011-11-25 jorge@jorgechamorro.com

function walk (file, cb) {
  var fs = require('fs');
  var q= [];
  var queue= [q];
  walk2();
  
  function walk2 () { 
    cb(file);
    fs.lstat(file, function (err, stat) {
      if (err) return next();
      if (stat.isDirectory()) {
        getDirectory(function (files) {
          q= files;
          queue.push(q);
          next();
        });
      }
      else next();
    });
  }
  
  function next () {
    if (q.length) {
      file= q.pop();
      return walk2();
    } else {
      queue.length-= 1;
      if (queue.length) {
        q= queue[queue.length-1];
        return next();
      }
    }
  }
  
  function getDirectory (cb) {
    fs.readdir(file, function(err, files) {
      if (err) throw Error(err);
      files.sort(up);
      files.forEach(function (v,i,o) {
        o[i]= [file, '/', v].join('');
      });
      cb(files);
    });
  }
  
  function up (a,b) {
    a= a.toLowerCase();
    b= b.toLowerCase();
    if (a > b) return -1;
    if (a < b) return  1;
    else       return  0;
  }
}

// your callback here
var ctr= 0;
function callBack (file) { console.log( ["[", ++ctr, "] ", file].join('') ) };

process.argv.forEach(function(val, index, array) {
  if (index > 1) walk(val, callBack);
});
