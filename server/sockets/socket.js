const { io } = require('../server');

const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.emit('actualT', {
        usuario: 'Administrador',
        actual: ticketControl.actual(),
        ultimos: ticketControl.ultimos()
    });



    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });


    // Escuchar el cliente
    client.on('nextT', (data, callback) => {

        let siguiente = ticketControl.siguiente();

        callback({next: siguiente});

    });
    client.on('atender', (data, callback) => {

        // let siguiente = ticketControl.siguiente();
        if(!data.desk)
        {
            return callback({
                err:'El desk es necesario'
            });
        }
        let atenderTicket = ticketControl.atender(data.desk);
        callback({ticket: atenderTicket});
        if(atenderTicket === 'No hay tickets')
        {
            return;
        }
        client.broadcast.emit('actualT', {
            usuario: 'Administrador',
            actual: ticketControl.actual(),
            ultimos: ticketControl.ultimos()
        });
    });

});