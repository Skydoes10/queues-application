// HTML references
const lblNewTicket = document.querySelector("#lblNewTicket");
const btnCreateTicket = document.querySelector("button");

const socket = io();

socket.on("connect", () => {
  btnCreateTicket.disabled = false;
});

socket.on("disconnect", () => {
  btnCreateTicket.disabled = true;
});

socket.on("lastTicket", (lastTicket) => {
  lblNewTicket.innerText = `Ticket ${lastTicket}`;
});

btnCreateTicket.addEventListener("click", () => {
  socket.emit("nextTicket", null, (ticket) => {
    lblNewTicket.innerText = ticket;
  });
});
