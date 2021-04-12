import React, { useEffect, useRef, useState } from "react";
import socket from "../../socket";
import styles from "./index.module.css";
import { SignOut } from "../../firebase/firebase";
import Messages from "../../Messages";
// import { useHistory } from "react-router-dom";

const Chat = ({ match }) => {
  // socket.emit("conectado", "Hola desde el Cliente");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [newUser, setNewUser] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("token"));
  const { username, avatar } = user;
  const messageRef = useRef(null);
  // let slug = useHistory();

  useEffect(() => {
    socket.emit("connected", username);

    return () => {
      // socket.emit("disconnect");
      socket.off();
    };
  }, [username]);

  // useEffect(() => {
  //   socket.on("newUser", (user) => {
  //     setNewUser([...newUser, user]);
  //   });
  // }, [newUser]);

  // useEffect(() => {
  //   socket.on("messages", (mes) => {
  //     setMessages([...messages, mes]);
  //   });

  //   return () => {
  //     socket.off();
  //   };
  // }, [messages]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

    return () => {
      socket.off();
    };
  }, [messages]);

  useEffect(() => {
    messageRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.length) return;
    // socket.emit("newUser", message);
    socket.emit("sendMessage", message);
    setMessage("");
  };

  console.info({ message }, { messages });
  console.info(newUser);

  return (
    <div className={styles.container}>
      <div className={styles.chat_container}>
        <div className={styles.user_container}>
          <div className={styles.avatar}>
            <img src={avatar} alt={username} />
          </div>
          <h6>
            {/* {messages[0].text} */}
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
          {messages.map((message, i) => (
            <Messages key={i} mess={message} username={username} />
          ))}
          <div ref={messageRef}></div>
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
