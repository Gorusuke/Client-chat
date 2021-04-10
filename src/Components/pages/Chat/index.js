import React, { useEffect } from "react";
import socket from "../../socket";
import styles from "./index.module.css";
import { SignOut } from "../../firebase/firebase";

const Chat = () => {
  // socket.emit("conectado", "Hola desde el Cliente");
  const user = JSON.parse(sessionStorage.getItem("token"));
  const { username, avatar } = user;

  // useEffect(() => {
  //   socket.emit("conectado", username);
  // }, [username]);

  // console.info(username);

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
            <p>@ {"Jose"} se ha conectado al chat, Saludalo!</p>
          </div>
        </div>
      </div>
      <form className={styles.form}>
        <div>
          <input type="text" />
          <button>Enviar</button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
