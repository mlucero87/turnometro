// comando para establecer la conexion
var socket = io();

var searchParams = new URLSearchParams(window.location.search);
var label = $("small");
if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es requerido');
}

var escritorio = searchParams.get('escritorio');

$("h1").text('Escritorio: ' + escritorio);

$("button").on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        if (resp === 'No hay tickets que atender') {
            label.text('   ' + resp);
            return;
        }
        label.text('Ticket: ' + resp.numero);
    })
})