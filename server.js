var net = require('net');
var PORT = 1337;

//array of sockets
var clients = [];

//create server
var server = net.createServer(connectionListener);

//connection listener, going to listen for all the connections 
function connectionListener(socket) {
  //on every connection, push the 'socket/client' into thid array!
  clients.push(socket);
  //console.log("Client List: ", clients);
  //visualize client connection to server
  console.log("client connected");
  server.getConnections(function (err, length) {
    console.log(length);
  });



  
  //Set encoding because string!
  socket.setEncoding('utf8');
  
  //when theres data print it to screen! 
  //and distribute it to all clients!
  socket.on('data', function (data) {
    console.log(data);
    //for every client in the array write to them whats going on
    for(var i=0; i < clients.length; i++) {
      var current = clients[i];
      current.write(data);
    }
  });

  socket.on('end', function () {
    console.log("socket ended");
    server.getConnections(function (err, length){
    console.log(length);
    });
  });
  
  //when a client disconnects, then delete the socket
  socket.on('close', function() {
  
    console.log("Someone logged off! ");
    var i = clients.indexOf(socket);
    clients.splice(i, 1);
  });


}

//whatever the server is 'inputting' print it to the client
  process.stdin.on('data', function (data) {
    for(var i=0; i < clients.length; i++) {
      var current = clients[i];
      current.write(data);
    }
  });





//Open server for connection
server.listen(PORT, function () {
  console.log("server listening on " + PORT);
});


