import React, { useEffect, useState } from "react";
import socket from "../../socket";
import styles from "./index.module.css";
import { SignOut } from "../../firebase/firebase";
import Messages from "../../Messages";

const Chat = () => {
  // socket.emit("conectado", "Hola desde el Cliente");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("token"));
  const { username, avatar } = user;

  useEffect(() => {
    socket.emit("conectado", username);
  }, [username]);

  useEffect(() => {
    socket.on("messages", (mes) => {
      setMessages([...messages, mes]);
    });

    return () => {
      socket.off();
    };
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.length) return;
    socket.emit("message", username, message);
    setMessage("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.chat_container}>
        <div className={styles.user_container}>
          <div className={styles.avatar}>
            <img src={avatar} alt={username} />
          </div>
          <h6>
            Hello, {`${username.split(" ")[0]} ${username.split(" ")[2]}`}
          </h6>
          <button onClick={() => SignOut()}>Sign Out</button>
        </div>
        <div className={styles.information_container}>
          <h6>You're Online!</h6>
          <p>{2} user(s) online now</p>
          <div className={styles.notifications}>
            <h6>Notifications</h6>
            <p>
              <span> @{"Jose"}</span> se ha conectado al chat, Saludalo!
            </p>
          </div>
        </div>
      </div>
      <div className={styles.form_container}>
        <div>
          {messages.map((mess, i) => (
            <Messages key={i} mess={mess} />
          ))}
        </div>
        <form onSubmit={sendMessage}>
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
      </div>
    </div>
  );
};

export default Chat;
