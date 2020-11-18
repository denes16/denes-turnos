
const fs = require('fs');

class Ticket {
    constructor(numero, desk) {
        this.numero = numero;
        this.desk = desk;
    }
}


class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.last4 = [];

        let data = require('../data/data.json');
        if( data.hoy === this.hoy)
        {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.last4 = data.last4;
        }
        else
        {
            this.reiniciarConteo();
        }
    }
    reiniciarConteo()
    {
        this.tickets = [];
        this.last4 = [];
        this.ultimo = 0,
        this.saveData();
        console.log('Se reinició el sistema');

    }
    siguiente()
    {
        this.ultimo++;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.saveData();
        return `Ticket ${ this.ultimo }`;
    }
    actual()
    {
        return `Ticket ${ this.ultimo }`;
    }
    atender(desk)
    {
        if(this.tickets.length === 0)
        {
            return 'No hay tickets';
        }
        let numero = this.tickets[0].numero;
        this.tickets.shift();
        let ticketAtender = new Ticket(numero,desk);
        this.last4.unshift( ticketAtender );
        if(this.last4.length > 4)
        {
            this.last4.splice(-1,1);
        }
        console.log(this.last4);
        this.saveData();
        return ticketAtender;
    }
    saveData()
    {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            last4: this.last4
        };
        jsonData = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonData);
    }
    ultimos()
    {
        return this.last4;
    }
}

module.exports = {
    TicketControl
};
