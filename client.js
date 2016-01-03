//this is all your client will do!

var net = require('net');
var PORT = 1337;



//create socket
var socket = new net.Socket();
socket.setEncoding('utf8');
var input = process.stdin;
//set up connect listener
socket.on('connect', function () {
  //connect to server and say hello
  console.log('connected to server on port' + PORT);
  //this is us writing to the socket!!!
  socket.write("I am a new client");
  //console.log("ayy", socket);
});

//getting data from the command line then writing it to the server
process.stdin.on('data', function (data) {
  socket.write(data);
});

//whats coming in from server
socket.on('data', function (data) {
 console.log(data);

});

socket.on('end', function () {
  console.log("socket ended");
});


//connect to server
socket.connect(PORT);


//capture inut and pass it to the socket 