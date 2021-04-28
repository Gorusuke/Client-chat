import React, { useState } from "react";
import socket from "../../socket";
import styles from "./index.module.css";

const SendMessageForm = () => {
  const [message, setMessage] = useState("");
  const username = sessionStorage.getItem("username");
  const data = {
    username,
    message,
  };
  // console.info(username);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.length) return;
    socket.emit("sendMessage", data);
    setMessage("");
  };

  return (
    <form onSubmit={sendMessage} className={styles.form}>
      <div>
        <input
          type="text"
          value={message}
          placeholder="type your message here...!"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>Enviar</button>
      </div>
    </form>
  );
};

export default SendMessageForm;
