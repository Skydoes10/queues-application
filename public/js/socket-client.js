const lblOnline = document.querySelector("#lblOnline");
const lblOffline = document.querySelector("#lblOffline");
const txtMessage = document.querySelector("#txtMessage");
const btnSend = document.querySelector("#btnSend");

const socket = io();

socket.on("connect", () => {
  // console.log('Connected to server');

  lblOnline.style.display = "";
  lblOffline.style.display = "none";
});

socket.on("disconnect", () => {
  // console.log('Disconnected to server');

  lblOnline.style.display = "none";
  lblOffline.style.display = "";
});

socket.on("receive-message", (payload) => {
  console.log("Received message", payload);
});

btnSend.addEventListener("click", () => {
  const message = txtMessage.value;
  const payload = {
    message,
    id: "123ABC",
    timestamp: Date.now(),
  };

  socket.emit("send-message", payload, (id) => {
    console.log("Sent message", id);
  });
});
