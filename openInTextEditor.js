// 20110417 jorge@jorgechamorro.com

Number.MAX_INT= Math.pow(2,53);
var tmpFileName= process.env.TMPDIR+ (Number.MAX_INT * Math.random()).toString(36)+ '.txt';

var cp= require('child_process');
cp.exec('touch '+ tmpFileName);
cp.spawn('open', ['-W', '-t', tmpFileName]).on('exit', onExit);

var fs= require('fs');
function onExit () {
  console.log(fs.readFileSync(tmpFileName).toString('utf8'));
}
