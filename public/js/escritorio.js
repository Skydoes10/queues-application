// HTML references
const lblDesk = document.querySelector("h1");
const btnAttend = document.querySelector("button");
const lblTicket = document.querySelector("small");
const divAlert = document.querySelector(".alert");
const lblPendientes = document.querySelector("#lblPendientes");

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("El escritorio es necesario");
}

const desk = searchParams.get("escritorio");
lblDesk.innerText = desk;

divAlert.style.display = "none";

const socket = io();

socket.on("connect", () => {
  btnAttend.disabled = false;
});

socket.on("disconnect", () => {
  btnAttend.disabled = true;
});

socket.on("pendingTickets", (pendingTickets) => {
  if (pendingTickets === 0) {
    lblPendientes.style.display = "none";
  } else {
    lblPendientes.style.display = "";
    lblPendientes.innerText = pendingTickets;
  }
});

btnAttend.addEventListener("click", () => {
  socket.emit("attendTicket", { desk }, ({ ok, msg, ticket }) => {
    if (!ok) {
      lblTicket.innerText = "Nadie";
      return (divAlert.style.display = "");
    }

    lblTicket.innerText = `Ticket ${ticket.number}`;
  });
});
