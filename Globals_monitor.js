(function () {
  var global= (function(){return this})();
  var seen= Object.getOwnPropertyNames(global);
  (function monitorGlobals () {
    var nu= Object.getOwnPropertyNames(window);
    if (nu.length !== seen.length) {
      nu.forEach(function (key,unused1,unused2) {
        if (seen.indexOf(key) < 0) console.error("*** WARNING: New global symbol -> '"+ key+ "' -> "+ global[key]);
      });
      seen= nu;
    }
    setTimeout(monitorGlobals, 1e3);
  })();
})();
