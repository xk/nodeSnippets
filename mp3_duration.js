//2011-11-01 Jorge@jorgechamorro.com
//Ejecuta ffmpeg y extrae la duración

var file= '/test.m4a';

require('child_process').exec('ffmpeg -i '+ file, cb);

function cb (error, stdout, stderr) {
  console.log('Duration: '+ (stdout + stderr).split('Duration: ')[1].split(', start: ')[0]);
}
