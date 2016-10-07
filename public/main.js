$(document).ready(function() {
  
  var name = prompt("Hi there! What's your name?") || "anonymous";
  var nametag = $('#nametag');
  nametag.html("Welcome "+name);
  
    var socket = io();
    socket.emit("entry",name);
    var input = $('input');
    var messages = $('#messages');

    var announceEntry = function(name){
      var announcement = "<em>"+name+" just joined.</em>";
      addMessage(announcement);

    };
    var addMessage = function(message) {
        messages.append('<div>' + message + '</div>');
    };

    input.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }

        var message = "<em>"+ name + ": </em>" + input.val();
        addMessage(message);
        socket.emit("message",message);
        input.val('');
    });
  
    socket.on("message", addMessage);
    socket.on("entry",announceEntry);

});



