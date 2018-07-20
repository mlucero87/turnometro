const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control.js');

let ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        callback(siguiente);
    })

    client.emit('estadoActual', {
        ultimo: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    })

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return {
                err: true,
                mensaje: 'El escritorio es requerido'
            }
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);

        //actualizar / notificar cambios de los ultimos4

        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        })
    });

});