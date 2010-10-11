var inspect= require('sys').inspect;

(function f () {
  (function g () {
    setTimeout(wrap(i), 10);
  })();
})();

function wrap (f) {
  try {
    throw Error('previousTrace');
  } catch (e) {
    Error.captureStackTrace(e, wrap);
    var stackTrace= e.stack.split("\n");
  }
  return function () {
    try {
      var res= f();
    } catch (e) {
      e.previousStackTrace= stackTrace;
      throw e;
    }
    return res;
  };
}

function i () {
  throw Error('This is the error that we want to track');
}

process.on('uncaughtException', function ƒ (err) {
  var previous= err.previousStackTrace;
  Error.captureStackTrace(err, ƒ);
  var stack= err.stack.split("\n");
  console.log('Caught exception:\n', inspect(stack,0,99,1,1), "\n", inspect(previous,0,99,1,1));
});