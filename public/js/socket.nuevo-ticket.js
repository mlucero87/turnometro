// comando para establecer la conexion
var socket = io();

var lblticket = $("#lblNuevoTicket");
//escuchar 
socket.on('connect', function(args) {
    console.log('conectado al servidor.');
});

socket.on('disconnect', function(args) {
    console.log('perdimos conexion con el servidor.');
});

socket.on('estadoActual', function(resp) {
    lblticket.text(resp.ultimo);
});

$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        lblticket.text(siguienteTicket);
    });
});