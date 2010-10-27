// finger_server.js - a minimal finger protocol implementation in node.js.
// Released under the 3 clause BSD license by Matt Croydon <mcroydon@gmail.com> (http://postneo.com)

var net = require('net');

// User data goes here.
var users = {
    mcroydon: {username: 'mcroydon', name:'Matt Croydon', twitter: 'mc', plan: 'Watch out for zombies.'},
};

// Padding for user lists.
var pad = function(string, length) {
    length = length || 20;
    while (string.length <= length) {
        string = string + ' ';
    }
    return string
};

// Disregard verbosity and strip trailing <CR><LF>
var clean_data = function(string) {
    return string.replace('/W', '').replace('\r\n', '');
};

net.createServer(function (socket) {
  socket.setEncoding("ascii");
  
  socket.on("data", function (data) {
    console.log('Starting connection.');
    if (data === '\r\n') {
        console.log('  Serving index.');
        socket.write(pad('Login') + pad('Name') + 'Twitter' + '\r\n');
        for (var index in users) {
            var user = users[index];
            socket.write(pad(user.username) + pad(user.name) + user.twitter + '\r\n');
        }
    }
    else if (clean_data(data) in users) {
        console.log('  Serving user: ' + clean_data(data));
        var user = users[clean_data(data)];
        socket.write(pad('Login: ' + user.username, 40) + pad('Name: ' + user.name, 40) + '\r\n');
        socket.write(pad('Twitter: ' + user.twitter, 40) + '\r\n');
        if (user.plan) {
            socket.write('Plan: ' + user.plan + '\r\n');
        }
    }
    else {
        console.log('Unhandled: ' + clean_data(data));
    }
    socket.end();
  });
  socket.on("end", function () {
    console.log('Ending connection.');
    socket.end();
  });

}).listen(79, "127.0.0.1");

console.log('finger_server.js running.  To test, run "finger @127.0.0.1"');