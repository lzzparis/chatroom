$(document).ready(function() {
  
  var name = prompt("Hi there! What's your name?");
  var nametag = $('#nametag');
  nametag.html("Welcome "+name);
  
    var socket = io();
    socket.emit("name",name);
    var input = $('input');
    var messages = $('#messages');

    var addMessage = function(message) {
        messages.append('<div>' + message + '</div>');
    };

    input.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }

        var message = input.val();
        addMessage(message);
        socket.emit("message",message);
        input.val('');
    });
  
    socket.on("message", addMessage);

});
