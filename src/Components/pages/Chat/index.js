import React from "react";
import socket from "../../socket";

const Chat = () => {
  socket.emit("conectado", "Hola desde el Cliente");

  return (
    <div>
      <h1>Desde Chat</h1>
    </div>
  );
};

export default Chat;
