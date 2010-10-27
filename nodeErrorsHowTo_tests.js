var inspect= require('sys').inspect;
var http= require('http');


process.on('uncaughtException', function ƒ_ (err) {
  var previous= err.previousStackTrace;
  var stack= err.stack.split("\n");
  console.log('Caught exception:\n', inspect(stack,0,99,1,1), "\n", inspect(previous,0,99,1,1));
  console.log("-------------");
});


(function ƒ_a () {
  process.nextTick(trace(function ƒ_b () {
    throw Error('from nextTick');
  }));
})();

(function ƒ_c () {
  setTimeout(trace(function ƒ_d () {
    throw Error('from setTimeout');
  }), 1);
})();


var server;
(function ƒ_e () {
  (server= http.createServer(trace(function ƒ_serverCallback (req, res) {
    throw Error('server::onRequest');
  }))).listen(12345);
})();


var client = http.createClient(12345, "localhost");
(function () {
  setTimeout(function () {
    var request= client.request("GET", "/", {});
    request.end();
  }, 5);
})();

setTimeout(function () {
  server.close();
}, 2222);

function trace (f) {
  var stackTrace= Error('previousTrace').stack.split("\n");
  return function trace () {
    try {
      return f.apply(this, arguments);
    } catch (e) {
      e.previousStackTrace= stackTrace;
      throw e;
    }
  };
}