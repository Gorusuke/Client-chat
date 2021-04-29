import React, { useEffect, useState } from "react";
import { SignOut } from "../../firebase/firebase";
import styles from "./index.module.css";
import socket from "../../socket";

const ChatLeftSide = () => {
  const usernameToken = sessionStorage.getItem("username");
  const avatarToken = sessionStorage.getItem("avatar");
  const [notify, setNotify] = useState(false);
  const [newUser, setNewUser] = useState([]);
  const [conection, setConection] = useState([]);

  useEffect(() => {
    socket.emit("users", ({ users }) => {
      setNewUser(users);
    });
  }, [newUser]);

  useEffect(() => {
    socket.on("message", (message) => {
      setConection(message);
    });
  }, []);

  useEffect(() => {
    setNotify(true);
    setTimeout(() => {
      setNotify(false);
    }, 2000);
  }, [conection]);

  return (
    <div className={styles.chat_container}>
      <div className={styles.user_container}>
        <div className={styles.avatar}>
          {avatarToken !== null ? (
            <img src={avatarToken} alt={usernameToken} />
          ) : (
            usernameToken !== null && (
              <div>{usernameToken.toUpperCase().split("")[0]}</div>
            )
          )}
        </div>
        <h6>Hello, {usernameToken && usernameToken}</h6>
        <button onClick={() => SignOut()}>Sign Out</button>
      </div>
      <div className={styles.information_container}>
        <h6>You're Online!</h6>
        <p>{newUser.length} user(s) online now</p>
        <div className={notify ? styles.notifications2 : styles.notifications}>
          <h6>Notifications</h6>
          {conection && (
            <p>
              <span>{conection.text}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatLeftSide;
