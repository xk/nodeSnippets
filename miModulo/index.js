//20100409 jorge@jorgechamorro.com
//For NodeJS > v 0.1.33

var spawn = require("child_process").spawn;
var kMaxAtOnce= 20;
var queue= [];
var spawned= 0;

function dispatch (e) {
  var child= spawn("gzip", ["-c", "-f", "-n"]);
  var stdout= "", stdin= "";
  spawned++;

  child.stdout.addListener("data", function (chunk) {
    if (chunk) stdout+= chunk;
  });

  child.stderr.addListener("data", function (chunk) {
    if (chunk) stderr+= chunk;
  });

  child.addListener("exit", function (code) {
    //sys.puts((+new Date())+ (" spawned: "+ spawned+ "             ").slice(0,15)+ "queue.length: "+ queue.length);
    //sys.puts("ctr: "+ ctr+ "\ninput: \""+ e.str+ "\"\n-->"+ hexdump(stdout));
    e.callback(code ? "" : stdout);
    spawned--;
    if (queue.length) {
      dispatch(queue.shift());
    }
  });

  child.stdout.setEncoding('binary');
  child.stdin.write(e.str, "utf8");
  child.stdin.end();
}

exports.gzipStr= function gzipStr (str, callback) {
  var e= { str: str, callback: callback };
  if (spawned < kMaxAtOnce) {
    dispatch(e);
  } else {  
    queue.push(e);
  }
};