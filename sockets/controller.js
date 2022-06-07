const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {
  // When a client connects
  socket.emit("lastTicket", ticketControl.last);
  socket.emit("lastFour", ticketControl.lastFour);
  socket.emit('pendingTickets', ticketControl.tickets.length);

  socket.on("nextTicket", (payload, callback) => {
    const ticket = ticketControl.next();
    callback(ticket);
    socket.broadcast.emit('pendingTickets', ticketControl.tickets.length);
  });

  socket.on("attendTicket", ({ desk }, callback) => {
    if (!desk) {
      return callback({
        ok: false,
        message: "El escritorio es necesario",
      });
    }

    const ticket = ticketControl.attendTicket(desk);

    socket.broadcast.emit("lastFour", ticketControl.lastFour);

    socket.broadcast.emit('pendingTickets', ticketControl.tickets.length);
    socket.emit('pendingTickets', ticketControl.tickets.length);
    
    if (!ticket) {
      return callback({
        ok: false,
        message: "No hay tickets",
      });
    }

    callback({
      ok: true,
      ticket,
    });
  });
};

module.exports = {
  socketController,
};
