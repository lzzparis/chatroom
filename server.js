var socket_io = require("socket.io");
var http = require("http");
var express = require("express");

var app = express();
app.use(express.static("public"));

//wrap Express app in Node http.Server object
var server = http.Server(app);

//Create the Socket.io Server, an EventEmitter
var io = socket_io(server);

//Register an event listener
io.on("connection", function(socket){
  //called every time a client connects
  console.log("Client connected");

  socket.on("name", function(name){
    var announcement = name+" just joined";
    io.emit("message", announcement);
  });

  socket.on("message", function(message){
    console.log("Message received:", message);
    socket.broadcast.emit("message",message);
  });
});

//note: http.Server is listening, not Express app directly... Q?
server.listen(process.env.PORT || 8080);


